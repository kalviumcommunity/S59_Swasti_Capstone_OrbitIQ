import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LunaAI from "../assets/chat.png"
import "../css/Landing.css";
import VideoLink from "../assets/space_landing_vid.mp4";
import LogoIcon from "../assets/Logo-icon.png";
import DownButton from "../assets/down-btn.png";
import About from "../components/About.jsx";
import IsLoggedIn from "../functions/isLoggedIn.jsx";

export default function Landing() {
  const [fadeOut, setFadeOut] = useState(false);
  const isLogged = IsLoggedIn();

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 400;
      if (window.scrollY > threshold) {
        setFadeOut(true);
      } else {
        setFadeOut(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontWeight: "normal"
  }

  return (
    <>
      <div className={`parent ${fadeOut ? "fade-out" : ""}`}>
        <div className="sub-div-one">
          <div className="text-div-parent">
            <div className="logo-div">
              <p className="web-name">OrbitIQ</p>
              <img className="logo-icon" src={LogoIcon} alt="Logo-Icon" />
            </div>
            <p className="description">
              "Journey to the Stars: Unveiling the Mysteries of Outer Space"
            </p>
            <Link
              to="signup"
              style={{
                width: "fit-content",
              }}
            >
              <button className="launch-btn" aria-label="Launch into Learning">
                Launch into Learning
              </button>
            </Link>
          </div>
        </div>
        <div className="sub-div-two">
          <video autoPlay muted loop>
            <source src={VideoLink} type="video/mp4" />
          </video>
          <div className="nav-top">
            {isLogged ? (<Link to="/dashboard"
              style={linkStyle}><p>Dashboard</p></Link>) :
              (<><Link
                to="/signup"
                style={linkStyle}
              >
                <p>SIGN UP</p>
              </Link>
                <Link
                  to="/login"
                  style={linkStyle}
                >
                  <p>SIGN IN</p>
                </Link></>)
            }
          </div>
          <div className="parent-div-text"></div>
          <div className="text-over-subparent">
            <p className="text-over-vid">Join & Start Learning</p>
            <div className="Down-btn animated-up-down">
              <img src={DownButton} alt="Down-btn" />
            </div>
          </div>
        </div>
      </div>
      <Link to="/generative-ai"><div className="ai-bot"><img src={LunaAI} alt="Luna AI"/></div></Link>
      <About />
    </>
  );
}
