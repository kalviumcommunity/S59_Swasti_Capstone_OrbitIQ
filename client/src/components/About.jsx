import React from "react";
import Image2 from "../assets/Image2.jpg";
import Planet from "../assets/planet.jpeg";
import Astro from "../assets/astro.jpg";
import Telescope from "../assets/telescope.jpeg";
import Neptune from "../assets/neptune.jpg";
import PlanetIcon from "../assets/planetIcon.png";
import { Parallax } from "react-parallax";
import TextBox from "./TextBox";
import Footer from "./Footer";

import "../css/About.css";

export default function About() {
  return (
    <>
     
      <div className="text-box">
        <p className="text-align-center">| About OrbitIQ</p>
        <p className="about-text">
          OrbitIQ is the ultimate destination for space enthusiasts, offering a
          captivating fusion of cutting-edge technology and expertly curated
          content. From exploring distant planets to unraveling the secrets of
          black holes, OrbitIQ provides an unparalleled educational experience
          that inspires curiosity and ignites the imagination. Join a vibrant
          community of learners and embark on an odyssey of cosmic exploration,
          where every interaction deepens your understanding of the universe.
        </p>
      </div>
      
      <div className="text-box">
        <p className="text-align-center">| About World</p>
        <div className="card-div">
          <div className="small-div div1">
            <img src={Planet} alt="imag1" className="image"/>
            <div className="overlay">
            <h2>Planets</h2>
            <p>Explore the wonders of our solar system</p>
            </div>
            
          </div>
          <div className="small-div div2">
            <img src={Telescope} alt="imag1" />
            <div className="overlay">
            <h2>Telescope</h2>
            <p>Unveiling the secrets of the universe</p>
            </div>
          </div>
          <div className="small-div div3">
            <img src={Image2} alt="imag1" />
            <div className="overlay">
            <h2>Earth</h2>
            <p>Our beautiful home, seen from space</p>
            </div>
          </div>
          <div className="small-div div4">
            <img src={Astro} alt="imag1" />
            <div className="overlay">
            <h2>Astronaut</h2>
            <p>Journeying beyond the bounds of Earth</p>
            </div>
          </div>
          <div className="small-div div5">
            <img src={Neptune} alt="imag1" />
            <div className="overlay">
            <h2>Neptune</h2>
            <p>Dive into the mysteries of distant worlds</p>
            </div>
          </div>
        </div>

        <Parallax strength={800} bgImage={Astro}>
          <div className="get-started-box">
            <img src={PlanetIcon} alt="planet" />
            <div>
              <p className="p-1">GET STARTED NOW</p>
              <p className="p-2">
                Learn | Visualise | Implement: Your pathway to understanding and
                optimizing the cosmos.
              </p>
            </div>
          </div>
          <TextBox />
          <Footer />
        </Parallax>
      </div>
    </>
  );
}
