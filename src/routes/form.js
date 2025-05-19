const express = require('express');
const router = express.Router();
const { saveFormData, updateFormStatus, getForms } = require('../services/db');
const { sendConfirmationEmail } = require('../services/email');

router.post('/', async (req, res) => {
  const formData = req.body;
  try {
    await saveFormData(formData);
    // await sendConfirmationEmail(formData.email);
    res.status(200).json({ message: 'Form submitted and email sent!' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  }
});

router.get('/', async (req, res) => {
  const data = await getForms();
  res.json(data);
});

module.exports = router;
