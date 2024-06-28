import React from 'react';
import Chat from "../assets/chat.png"
import "../css/LunaAI.css";

const LunaAI = ({ response }) => {
  return (
    <div className="lunaai-container">
      <div className="lunaai-icon">
        <img src={Chat} alt='robot' />
      </div>
      <div className="lunaai-message">
        {response}
      </div>
    </div>
  );
};

export default LunaAI;