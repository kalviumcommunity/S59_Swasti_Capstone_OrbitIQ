import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Exit from "../assets/exit.png";
import "../css/Dashboard.css";
import LogoDash from "../assets/Logo-white.png";
import Home from "../assets/Home.png";
import Quiz from "../assets/ideas.png";
import Funfact from "../assets/fun-fact.png";
import Profile from "../assets/profile-default.png";
import MagnifyingGlass from "../assets/magnifying-glass.png";
import Bell from "../assets/bell.png";
import Slider1 from "../assets/Slider1.png";
import CardContainer from "../components/CardContainer";

const API_URI = `${import.meta.env.VITE_API_URI}/user/logout`;

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.Username;
  const email = location.state?.Email;

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URI, {
        method: "POST",
      });
      if (response.ok) {
        console.log("Logout successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="p-dashboard">
      <div className="navholder">
        <div className="sideNav">
          <div className="option-logo">
            <img src={LogoDash} alt="logo-dash" />
            <h1>OrbitIQ</h1>
          </div>
          <div className="option-1">
            <img src={Home} alt="home" />
            <p>Dashboard</p>
          </div>
          <div className="option-1">
            <img src={Quiz} alt="quiz" />
            <p>Quiz</p>
          </div>
          <div className="option-1">
            <img src={Funfact} alt="funfact" />
            <p>Wonders</p>
          </div>
        </div>
        <div className="profile-div">
          <div className="profile-img">
            <img src={Profile} alt="profile" />
          </div>
          <h3>{username}</h3>
          <p>{email}</p>
        </div>
        <div className="logout" onClick={handleLogout}>
          <img className="exit" src={Exit} />
        </div>
      </div>
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
      </div>
    </div>
  );
}
