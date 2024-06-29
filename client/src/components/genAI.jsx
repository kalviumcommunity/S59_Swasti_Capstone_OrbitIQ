import React, { useState } from 'react';
import "../css/GenAi.css";
import Typewriter from './TypeAnimation';
import { marked } from 'marked';
import LunaAI from './LunaAI';
import { Snackbar, Alert } from '@mui/material';

const API_URI = `${import.meta.env.VITE_API_URI}/genai`;

const App = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleAskQuestion = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      };

      const res = await fetch(`${API_URI}/google-genai`, requestOptions);

      if (res.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      const htmlResponse = marked(data.response);
      setResponse(htmlResponse);
      setError(null);
    } catch (error) {
      console.error('Error asking question:', error);
      setError(error.message);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={handleAskQuestion}>Ask</button>
      </div>

      {response && (
        <div className="response-container">
          <div className="markdown-response">
            <LunaAI response={<Typewriter text={response} delay={10} />} />
          </div>
        </div>
      )}

      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default App;
