const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

module.exports = {
  dynamoDB: new AWS.DynamoDB.DocumentClient(),
  SES: new AWS.SES({ apiVersion: '2010-12-01' })
};