const express = require('express');
const router = express.Router();
const { handleChatCompletion } = require('../controllers/chatController');

router.post('/completion', handleChatCompletion);

module.exports = router;
