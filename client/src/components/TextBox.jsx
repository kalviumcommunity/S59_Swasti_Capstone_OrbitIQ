import React from "react";
import Learn from "../assets/learn.png";
import Num1 from "../assets/number-1.png";
export default function TextBox() {
  return (
    <div className="what-div">
      <div>
      <p>What's new About OrbitIQ?</p>
      <div>
        <img src={Num1} alt="num1"/>
      </div>
      </div>
      <img src={Learn} className="learn-img" alt="learn" />
    </div>
  );
}
