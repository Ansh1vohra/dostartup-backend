require('dotenv').config();
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || 'FormSubmissions';

async function saveFormData(data) {
  // First, ensure we have valid form data
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid form data');
  }

  // Create the item with explicit field mapping
  const item = {
    submissionId: uuidv4(),
    name: data.name || '',       // Provide default empty string
    email: data.email || '',     // Provide default empty string
    phone_number: data.phone_number || '',
    state: data.state || '',
    message: data.message || '',
    contacted: false,
    paid: false,
    createdAt: new Date().toISOString()
  };

  console.log('Final item to save:', item); // Debug log

  const params = {
    TableName: TABLE_NAME,
    Item: item
  };

  await dynamoDb.put(params).promise();
  return item;
}

async function getForms() {
  const params = {
    TableName: TABLE_NAME,
  };
  const result = await dynamoDb.scan(params).promise();
  return result.Items;
}

module.exports = { saveFormData, getForms };