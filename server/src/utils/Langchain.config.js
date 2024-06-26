const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage } = require('@langchain/core/messages');
require('dotenv').config();

const GenAImodel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  apiKey: process.env.GOOGLE_GEN_AI,
});

async function googleGenAi(ques) {
  let response = "";
  try {
    const message = new HumanMessage({ content: [{ type: 'text', text: ques }] });
    const res = await GenAImodel.invoke([message]);
    response = res.text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
  return response;
}

module.exports = googleGenAi;
