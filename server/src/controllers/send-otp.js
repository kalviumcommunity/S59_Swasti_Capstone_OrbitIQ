const nodemailer = require('nodemailer');
const { User } = require("../Model/user_schema");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.WEB_MAILID,
    pass: process.env.WEB_PASS,
  },
});

const sendOTPEmail = async (Email, OTP) => {
  const mailOptions = {
    from: process.env.WEB_MAILID,
    to: Email,
    subject: 'OTP Verification',
    html: `<div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <div style="background-color: #007BFF; color: white; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="margin: 0; font-size: 24px;">OTP Verification</h1>
    </div>
    <div style="padding: 30px; color: #333;">
        <h3 style="margin: 0 0 20px;">Hello,</h3>
        <p style="font-size: 16px; line-height: 1.5;">Your One-Time Password (OTP) is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #007BFF; text-align: center; margin: 20px 0;">${OTP}</div>
        <p style="font-size: 16px; line-height: 1.5;">Please use this OTP to complete your verification process. This OTP is valid for a limited time.</p>
        <p style="font-size: 14px; color: #555;">If you did not request this OTP, please ignore this email.</p>
    </div>
    <div style="text-align: center; padding: 10px; font-size: 12px; color: #777777; border-top: 1px solid #ddd; background-color: #f9f9f9;">
        <p style="margin: 0;">&copy; 2024 OrbitIQ. All rights reserved.</p>
    </div>
</div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

module.exports = sendOTPEmail;
