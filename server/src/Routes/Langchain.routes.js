const express = require("express");
const router = express.Router();

const googleGenAi = require('../utils/Langchain.config');

router.post('/google-genai', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    const response = await googleGenAi(question);
    res.json({ response });
  } catch (error) {
    console.error('Error processing AI response:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

module.exports = router;