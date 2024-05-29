import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { Link } from 'react-router-dom';
import "../css/Card.css";

const API_URI = `${import.meta.env.VITE_API_URI}/learning`;

function CardContainer() {
  const [modules, setModules] = useState([]);
  const [error, setError] = useState(null);

  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontWeight: "normal"
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`${API_URI}/module`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        console.log(data)
        setModules(data)
      } catch (error) {
        setError("Failed to fetch modules")
      }
    }

    fetchModules();
  }, [])

  const renderCards = (level) => {
    return modules
      .filter(module => module.level === level)
      .map((module, index) => (
        <Link key={index} to={`/dashboard/module/${module._id}`} style={linkStyle}>
          <CardComponent imgURL={module.ImgUrl} text={module.title} />
        </Link>
      ))
  }

  return (
    <>
      {error && <p>{error}</p>}
      <div className='levels'>
        <h1>Level 1: Stellar Beginnings</h1>
        <div className='card-container'>
          {renderCards('Level 1')}
        </div>
      </div>
      <div className='levels'>
        <h1>Level 2: Pioneers of Space</h1>
        <div className='card-container'>
          {renderCards('Level 2')}
        </div>
      </div>
    </>
  )
}

export default CardContainer;
