import React from 'react'
import CardComponent from './CardComponent'
import module1 from "../assets/galaxy.png"
import module2 from "../assets/planet.png"
import module3 from "../assets/astronaut.png"
import module4 from "../assets/robotic-hand.png"
import module5 from "../assets/solar-system.png"
import module6 from "../assets/explorer.png"
import module7 from "../assets/satellite.png"
import module8 from "../assets/spaceship.png"

import "../css/Card.css"

function CardContainer() {
  return (
    <>
      <div className='levels'>
        <h1>Level 1 : Stellar Beginnings</h1>
        <div className='card-container'>
          <CardComponent imgURL={module1} text="Introduction to Outer Space" />
          <CardComponent imgURL={module2} text="Exploring Celestial Bodies" />
          <CardComponent imgURL={module3} text="Space Exploration History" />
          <CardComponent imgURL={module4} text="Space Technology and Innovations" />
        </div>
      </div>
      <div className='levels'>
        <h1>Level 2 : Pioneers of Space</h1>
        <div className='card-container'>
          <CardComponent imgURL={module5} text="Advanced Celestial Mechanics" />
          <CardComponent imgURL={module6} text="Space Operations and Management" />
          <CardComponent imgURL={module7} text="Advanced Space Technologies" />
          <CardComponent imgURL={module8} text="Spacecraft Design and Engineering" />
        </div>
      </div>

    </>


  )
}

export default CardContainer