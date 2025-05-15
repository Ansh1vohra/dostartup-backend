const express = require('express');
const router = express.Router();
const formController = require('../controllers/form.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validation.middleware');

// Form submission routes
router.post('/submit', 
  authMiddleware.verifyToken, 
  validationMiddleware.validateFormSubmission, 
  formController.submitForm
);

router.get('/submissions', 
  authMiddleware.verifyToken, 
  formController.getUserSubmissions
);

router.get('/:submissionId', 
  authMiddleware.verifyToken, 
  formController.getSubmissionDetails
);

module.exports = router;