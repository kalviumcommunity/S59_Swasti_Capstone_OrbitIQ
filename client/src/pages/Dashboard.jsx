import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Exit from "../assets/exit.png";
import "../css/Dashboard.css";
import LogoDash from "../assets/Logo-white.png";
import Home from "../assets/Home.png";
import Quiz from "../assets/ideas.png";
import Funfact from "../assets/fun-fact.png";
import MagnifyingGlass from "../assets/magnifying-glass.png";
import Bell from "../assets/bell.png";
import Slider1 from "../assets/Slider1.png";
import CardContainer from "../components/CardContainer";

const API_URI = `${import.meta.env.VITE_API_URI}/user/logout`;
const GetImage_URI = `${import.meta.env.VITE_API_URI}/upload`;

export default function Dashboard() {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);
  const username = sessionStorage.getItem("Username");
  const email = sessionStorage.getItem("Email");
  const userId = sessionStorage.getItem("UserId");

  const getImage = () => {
    fetch(`${GetImage_URI}/profileImage/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response)
        return response.blob();
      })
      .then(blob => {
        const imageURL = URL.createObjectURL(blob);
        setImageURL(imageURL);
      })
      .catch(error => {
        console.error('Image Fetch Error:', error);
      });
  }
  useEffect(() => {
    getImage();
  }, [])

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
        <Link to='/profile' style={{
          textDecoration: "none",
          color: "inherit",
          fontWeight: "normal",
        }}><div className="profile-div">
            <div className="profile-img">
              <img src={imageURL} alt="profile" />
            </div>
            <h3>{username}</h3>
            <p>{email}</p>
          </div></Link>
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
