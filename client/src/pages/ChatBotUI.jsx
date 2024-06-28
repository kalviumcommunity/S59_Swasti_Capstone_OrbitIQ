import React from 'react'
import Robot from "../assets/chatbot.png"
import GenAI from "../components/genAI"
import LunaAI from '../components/LunaAI'

function ChatBotUI() {
    return (
        <div>
            <div className='align-center-ai-bot'>
                <img src={Robot} alt='Robot' />
                <h1>Luna AI</h1>
                <LunaAI response={<h2>Welcome to OrbitIQ, I am your assistant. How can I assist you?</h2>} />
            </div>
            <GenAI />
        </div>
    )
}

export default ChatBotUI
