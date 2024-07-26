// Import the necessary parts of the AWS SDK
require('dotenv').config();
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

// Configure the SES client using environment variables
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function Email(to, sub, content) {
  let from = "partnerships@athletereserve.com"; // This email address must be verified with Amazon SES

  // Prepare the email sending parameters
  const params = {
    Source: from,
    Destination: { ToAddresses: to },
    Message: {
      Subject: {
        Data: sub,
        Charset: 'UTF-8'
      },
      Body: {
        Html: {
          Data: content,
          Charset: 'UTF-8'
        }
      }
    }
  };

  // Create a command to send the email
  const command = new SendEmailCommand(params);

  try {
    // Send the email using the send method of the SESClient instance
    const data = await sesClient.send(command);
    console.log("Email sent:", data.MessageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

// Export the Email function
module.exports = {
  Email
};
