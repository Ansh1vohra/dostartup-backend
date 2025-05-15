const Form = require('../models/form.model.js');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.createFormSubmission = async (userId, formData) => {
  const params = {
    TableName: process.env.FORM_SUBMISSIONS_TABLE,
    Item: {
      submissionId: `${Date.now()}`,
      userId,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  };
  
  await dynamoDB.put(params).promise();
  return params.Item;
};

exports.getUserSubmissions = async (userId) => {
  const params = {
    TableName: process.env.FORM_SUBMISSIONS_TABLE,
    FilterExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  };
  
  const result = await dynamoDB.scan(params).promise();
  return result.Items;
};

exports.getSubmissionDetails = async (userId, submissionId) => {
  const params = {
    TableName: process.env.FORM_SUBMISSIONS_TABLE,
    Key: {
      submissionId
    }
  };
  
  const result = await dynamoDB.get(params).promise();
  
  if (!result.Item || result.Item.userId !== userId) {
    throw new Error('Submission not found or access denied');
  }
  
  return result.Item;
};