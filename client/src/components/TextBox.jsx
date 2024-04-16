import React from "react";
import Learn from "../assets/learn.png";

export default function TextBox() {
  return (
    <div className="what-div">
      <p>What's new About OrbitIQ?</p>
      <img src={Learn} className="learn-img" alt="learn" />
    </div>
  );
}
