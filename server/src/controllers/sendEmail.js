const nodemailer = require('nodemailer');
const fetchAPOD = require('../services/fetchAPOD');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.WEB_MAILID,
    pass: process.env.WEB_PASS,
  },
});

const sendAPODEmail = async (user, apodData) => {
  const mailOptions = {
    from: process.env.WEB_MAILID,
    to: user.Email,
    subject: 'NASA Astronomy Picture of the Day',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
        <h1 style="color: #004d99;">Hello ${user.Username},</h1>
        <p style="font-size: 16px;">Check out today's Astronomy Picture of the Day from NASA:</p>
        <h2 style="font-size: 20px; margin-bottom: 10px;">${apodData.title}</h2>
        <img src="${apodData.hdurl}" alt="APOD" style="max-width: 100%; height: auto;">
        <p>${apodData.explanation}</p>
        <p style="font-size: 16px;"><a href="${apodData.hdurl}" style="color: #0066cc; text-decoration: none;">View in high resolution</a></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`APOD email sent to ${user.Email}`);
  } catch (error) {
    console.error(`Error sending APOD email to ${user.Email}:`, error);
  }
};

module.exports = sendAPODEmail;
