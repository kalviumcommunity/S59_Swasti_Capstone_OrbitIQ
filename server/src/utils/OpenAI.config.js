require('dotenv').config();

const config = {
  apiKey: process.env.OPEN_AI_KEY,
  apiUrl: 'https://api.openai.com/v1/chat/completions'
};

module.exports = config;
