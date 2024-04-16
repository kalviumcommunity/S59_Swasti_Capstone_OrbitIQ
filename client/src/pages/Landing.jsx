import React from "react";
import { Link } from "react-router-dom";
import "../css/Landing.css";
import VideoLink from "../assets/space_landing_vid.mp4";
import LogoIcon from "../assets/Logo-icon.png";
import DownButton from "../assets/down-btn.png";
import About from "../components/About.jsx";

export default function Landing() {
  return (
    <>
      <div className="parent">
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
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
              }}
            >
              <p>SIGN UP</p>
            </Link>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: "normal",
              }}
            >
              <p>SIGN IN</p>
            </Link>
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
      <About />
    </>
  );
}
