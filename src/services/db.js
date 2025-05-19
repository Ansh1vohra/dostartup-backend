require('dotenv').config();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

async function saveFormData(data) {
  const item = {
    submissionId: uuidv4(),  
    ...data,
    contacted: false,
    paid: false,
    createdAt: new Date().toISOString()
  };
  

  const params = {
    TableName,
    Item: item
  };

  await dynamoDb.put(params).promise();
}

async function getForms() {
  const params = {
    TableName
  };

  const result = await dynamoDb.scan(params).promise();
  return result.Items;
}

module.exports = { saveFormData, getForms };
