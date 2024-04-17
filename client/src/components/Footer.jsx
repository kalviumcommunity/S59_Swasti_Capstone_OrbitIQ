import React from "react";
import Express from "../assets/express.png";
import Mongo from "../assets/mongodb.svg";
import Program from "../assets/programing.png";
import GitHub from "../assets/github.png";
import Linkedin from "../assets/linkedin.png";

export default function Footer() {
  return (
    <div className="footer-comp">
      <div className="footer">
        <img src={Express} alt="express" />
        <img src={Mongo} alt="mongo" />
        <img src={Program} alt="program" />
      </div>
      <div>
        <p>OrbitIQ</p>
        <p className="connect">Connect Now! </p>
        <div className="footer">
          <img src={GitHub} alt="github" />
          <img src={Linkedin} alt="linkedin" />
        </div>
      </div>
    </div>
  );
}
