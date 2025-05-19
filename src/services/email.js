const AWS = require('aws-sdk');

const ses = new AWS.SES({ region: process.env.SES_REGION });

async function sendConfirmationEmail(email) {
  const params = {
    Destination: { ToAddresses: [email] },
    Message: {
      Body: {
        Text: {
          Data: 'Thank you for submitting the form. We will contact you shortly.',
        },
      },
      Subject: { Data: 'Form Submission Received' },
    },
    Source: 'your-verified-email@example.com', // must be verified in SES
  };

  await ses.sendEmail(params).promise();
}

module.exports = { sendConfirmationEmail };
