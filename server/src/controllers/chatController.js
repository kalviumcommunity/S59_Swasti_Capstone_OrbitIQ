const { createChatCompletion } = require('../utils/chatCompletion');

async function handleChatCompletion(req, res) {
  console.log(req.body.messages)
  const { messages } = req.body;

  try {
    const completion = await createChatCompletion(messages);
    res.json(completion);
  } catch (error) {
    if (error.name === 'RateLimitError') {
      console.log('Rate limit exceeded:', error);
      res.status(429).send('Too many requests, please try again later.');
    }
    else{
      res.status(500).json({ error: 'Failed to create chat completion' });
    }
  }
}

module.exports = {
  handleChatCompletion
};
