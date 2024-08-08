import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Exit from "../assets/exit.png";
import "../css/Dashboard.css";
import LogoDash from "../assets/Logo-white.png";
import Home from "../assets/Home.png";
import Quiz from "../assets/ideas.png";
import Funfact from "../assets/fun-fact.png";

const API_URI = `${import.meta.env.VITE_API_URI}/user/logout`;
const GetImage_URI = `${import.meta.env.VITE_API_URI}/upload`;

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  fontWeight: "normal"
}

export default function SideNav({ username, userId, email, GoogleImage }) {
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);

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
    if (userId) {
      getImage();
    }
  }, [userId]);

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URI, {
        method: "POST",
        credentials: 'include'
      });
      if (response.ok) {
        console.log("Logout successful");
        document.cookie ="token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=Lax";
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
    <div className="navholder">
      <div className="sideNav">
        <Link to="/" style={linkStyle}>
          <div className="option-logo">
            <img src={LogoDash} alt="logo-dash" />
            <h1>OrbitIQ</h1>
          </div>
        </Link>
        <Link to="/dashboard" style={linkStyle}>
          <div className="option-1">
            <img src={Home} alt="home" />
            <p>Dashboard</p>
          </div>
        </Link>

        <Link to="/dashboard/quiz" style={linkStyle}><div className="option-1">
          <img src={Quiz} alt="quiz" />
          <p>Quiz</p>
        </div></Link>
        <Link to="/dashboard/facts" style={linkStyle}>
          <div className="option-1">
            <img src={Funfact} alt="funfact" />
            <p>Wonders</p>
          </div>
        </Link>
      </div>
      <Link to='/profile' style={linkStyle}><div className="profile-div">
        <div className="profile-img">
          <img src={imageURL || GoogleImage} alt="profile" />
        </div>
        <h3>{username}</h3>
        <p>{email}</p>
      </div></Link>
      <div className="logout" onClick={handleLogout}>
        <img className="exit" src={Exit} />
      </div>
    </div>
  );
}
