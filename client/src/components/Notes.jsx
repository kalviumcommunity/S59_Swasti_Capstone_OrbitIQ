import React, { useState } from 'react';

const API_URI = `${import.meta.env.VITE_API_URI}`;

function Notes() {
  const [notes, setNotes] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [summary, setSummary] = useState('');
  const [error,setError] =useState(null);

  const handleKeyDown = async (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: notes }
      ];

      try {
        const response = await fetch(`${API_URI}/chat-autocomplete/completion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ messages })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        const suggestion = data.choices[0].message.content;
        setSuggestions([...suggestions, suggestion]);
        setNotes(notes + suggestion);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setError(error.message)
      }
    }
  };

  const summarizeNotes = async () => {
    const messages = [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: `Summarize the following notes: ${notes}` }
    ];

    try {
      const response = await fetch(`${API_URI}/chat-autocomplete/completion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages })
      });

      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      

      const data = await response.json();
      const summary = data.choices[0].message.content;
      setSummary(summary);
    } catch (error) {
      console.error('Error summarizing notes:', error);
    }
  };

  return (
    <div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Start typing your notes here..."
        rows="10"
        cols="50"
      ></textarea>
      <button onClick={summarizeNotes}>Summarize Notes</button>
      {suggestions.length > 0 && (
        <div>
          <h3>Suggestions</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
      {summary && (
        <div>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
      {error &&(
        <p>{error}</p>
      )}
    </div>
  );
}

export default Notes;
