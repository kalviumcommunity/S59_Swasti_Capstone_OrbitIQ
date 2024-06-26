const express = require("express");
const router = express.Router();

const googleGenAi = require('../utils/Langchain.config');

router.post('/google-genai', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing question in request body' });
    }
    const response = await googleGenAi(question);
    res.json({ response });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res.status(400).json({ error: 'Invalid JSON in request body' });
    } else if (error.name === 'ValidationError') {
      res.status(422).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

});

module.exports = router;