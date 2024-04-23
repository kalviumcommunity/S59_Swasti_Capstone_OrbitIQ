import React from 'react'
import "../css/Card.css"

function CardComponent({ imgURL, text }) {
  return (
    <div className='card-div-module'>
      <img src={imgURL} alt={text} />
      <p>{text}</p>
    </div>
  )
}

export default CardComponent