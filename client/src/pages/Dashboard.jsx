import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Exit from "../assets/exit.png"
import "../css/Dashboard.css"

const API_URI= `${import.meta.env.VITE_API_URI}/user/logout`

export default function Dashboard() {
  const navigate =useNavigate();
  const location = useLocation();
  const username = location.state?.Username;

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URI, {
        method: "POST",
      });
      if (response.ok) {
        console.log("Logout successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {username ? 
        <h1>Welcome, {username}!</h1> : <h1>No username found</h1>}
        <div className='logout' onClick={handleLogout}>
        <img className='exit' src={Exit}/>
        </div>
        
    </div>
  )
}
