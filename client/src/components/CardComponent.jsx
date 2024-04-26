import React from 'react'
import PropTypes from 'prop-types';
import "../css/Card.css"

function CardComponent({ imgURL, text }) {
  return (
    <div className='card-div-module'>
      <img src={imgURL} alt={text} />
      <p>{text}</p>
    </div>
  )
}

CardComponent.propTypes = {
  imgURL: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default CardComponent
