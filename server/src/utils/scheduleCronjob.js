const cron = require('node-cron');
const { User } = require("../Model/user_schema"); 
const fetchAPOD =require('../services/fetchAPOD')
const sendEmail = require('../controllers/sendEmail');

const scheduleAPODEmails = () => {
  cron.schedule('0 9 * * *', async () => {
    try {
      const apodData = await fetchAPOD();
      const users = await User.find();

      users.forEach(async (user) => {
        await sendEmail(user, apodData);
      });

      console.log(`APOD emails sent to all users.`);
    } catch (error) {
      console.error('Error scheduling APOD emails:', error.message);
    }
  });
};

module.exports = scheduleAPODEmails;
