const express = require('express');
const router = express.Router();
const { saveFormData, getForms } = require('../services/db');

router.post('/', async (req, res) => {
  let formData;
  
  try {
    // Handle case where body is Buffer
    if (Buffer.isBuffer(req.body)) {
      formData = JSON.parse(req.body.toString());
    } 
    // Handle case where body is already parsed
    else if (typeof req.body === 'object') {
      formData = req.body;
    }
    // Handle invalid cases
    else {
      return res.status(400).json({ error: 'Invalid request body format' });
    }

    console.log('Processed form data:', formData);
    
    if (!formData || Object.keys(formData).length === 0) {
      return res.status(400).json({ error: 'Invalid form data' });
    }

    const savedItem = await saveFormData(formData);
    res.status(200).json({ 
      message: 'Form submitted successfully!',
      data: savedItem
    });
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).json({ 
      error: 'Something went wrong', 
      details: err.message 
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await getForms();
    res.json(data);
  } catch (err) {
    console.error('Error fetching forms:', err);
    res.status(500).json({ error: 'Failed to fetch forms' });
  }
});

module.exports = router;