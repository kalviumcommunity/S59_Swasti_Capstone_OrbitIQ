import React from 'react'
import MagnifyingGlass from "../assets/magnifying-glass.png";
import Bell from "../assets/bell.png";
import Slider1 from "../assets/Slider1.png";
import CardContainer from "./CardContainer";
import LunaAI from "../assets/chat.png"
import { Link } from 'react-router-dom';

function mainDash({username}) {
  return (
    <div className="main-dash">
        <div className="top-search-div">
          <div className="search-bar">
            <input type="text" placeholder="Search here" />
            <div className="search-img-back">
              <img src={MagnifyingGlass} />
            </div>
          </div>
          <div className="bell-div">
            <img src={Bell} alt="bell" />
          </div>
        </div>
        <div className="greetings-div">
          {username ? (
            <h1>
              <span>Welcome</span> {username} !
            </h1>
          ) : (
            <h1>No username found</h1>
          )}
          <img src={Slider1} />
        </div>
        <CardContainer />
        <Link to="/generative-ai"><div className="ai-bot"><img src={LunaAI} alt="Luna AI"/></div></Link>
        <Link to="/create-notes"><div>create</div></Link>
      </div>
  )
}

export default mainDash
