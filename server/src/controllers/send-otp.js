const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.WEB_MAILID,
    pass: process.env.WEB_PASS,
  },
});

const sendOTPEmail = async (Email, OTP) => {
  const mailOptions = {
    from: 'orbitiq.team@gmail.com',
    to: Email,
    subject: 'OTP Verification',
    text: `Your OTP for registration is ${OTP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent OTP: ${OTP} to ${Email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

module.exports = sendOTPEmail;
