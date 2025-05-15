const formService = require('../services/form.service');
const emailService = require('../services/email.service');
const whatsappService = require('../services/whatsapp.service.js');

exports.submitForm = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const formData = req.body;
    
    // Store form data
    const submission = await formService.createFormSubmission(userId, formData);
    
    // Send notifications
    await emailService.sendFormSubmissionEmail(userId, formData);
    await whatsappService.sendFormSubmissionWhatsApp(userId, formData);
    
    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserSubmissions = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const submissions = await formService.getUserSubmissions(userId);
    res.status(200).json({
      success: true,
      data: submissions
    });
  } catch (error) {
    next(error);
  }
};

exports.getSubmissionDetails = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const submissionId = req.params.submissionId;
    const submission = await formService.getSubmissionDetails(userId, submissionId);
    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    next(error);
  }
};