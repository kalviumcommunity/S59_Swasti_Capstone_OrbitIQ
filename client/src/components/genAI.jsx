import React, { useState } from 'react';
import "../css/GenAi.css"
import Typewriter from './TypeAnimation';

const API_URI = `${import.meta.env.VITE_API_URI}/genai`;

const App = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  const handleAskQuestion = async () => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      };

      const res = await fetch(`${API_URI}/google-genai`, requestOptions);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setResponse(data.response)
      setError(null);
    } catch (error) {
      console.error('Error asking question:', error);
      setError(error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={handleAskQuestion}>Ask</button>
      </div>

      {response && (
        <div className="response-container">
          <div
            className="markdown-response"
          />
          <Typewriter text={response} delay={10} />
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default App;
