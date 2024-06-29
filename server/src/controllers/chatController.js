const { createChatCompletion } = require('../utils/chatCompletion');

async function handleChatCompletion(req, res) {
  console.log(req.body.messages)
  const { messages } = req.body;

  try {
    const completion = await createChatCompletion(messages);
    res.json(completion);
  } catch (error) {
    if(error.response.status === 429){
      res.status(429).json({error:"rate limit exceeded"})
    }
    res.status(500).json({ error: 'Failed to create chat completion' });
  }
}

module.exports = {
  handleChatCompletion
};
