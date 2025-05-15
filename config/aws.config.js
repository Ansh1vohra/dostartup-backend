// aws.config.js (Production-safe version)
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' });

module.exports = {
  dynamoDB: new AWS.DynamoDB.DocumentClient(),
  SES: new AWS.SES({ apiVersion: '2010-12-01' })
};