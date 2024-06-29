const axios = require('axios');
const config = require('./OpenAI.config');

async function createChatCompletion(messages) {
  const data = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 0.7,
    max_tokens: 150
  };

  try {
    const response = await axios.post(config.apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
    console.log("respone-autocomplete",response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Error creating chat completion:', error.response.data);
    } else {
      console.error('Error creating chat completion:', error.response.data);
      throw error;
    }
  }
}

module.exports = {
  createChatCompletion
};
