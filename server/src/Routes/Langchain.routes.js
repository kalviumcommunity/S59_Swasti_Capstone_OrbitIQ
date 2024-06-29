const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const googleGenAi = require('../utils/Langchain.config');

const rateLimitExceededHandler = (req, res, next, options) => {
  res.status(options.statusCode).json({
    error: 'Too many requests',
    message: 'You have exceeded the number of allowed requests. Please try again after some time.'
  });
};

const googleGenAiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 10,
  handler: rateLimitExceededHandler, 
});

router.post('/google-genai', googleGenAiLimiter, async (req, res) => {
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