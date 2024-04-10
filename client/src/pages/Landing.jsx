import React from "react";
import "../css/Landing.css";
import VideoLink from "../assets/space_landing_vid.mp4";
import LogoIcon from "../assets/Logo-icon.png";
import DownButton from "../assets/down-btn.png";

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
            <button className="launch-btn" aria-label="Launch into Learning">Launch into Learning</button>
          </div>
        </div>
        <div className="sub-div-two">
          <video autoPlay muted loop>
            <source src={VideoLink} type="video/mp4" />
          </video>
          <div className="nav-top">
            <p>SIGN UP</p>
            <p>SIGN IN</p>
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
    </>
  );
}