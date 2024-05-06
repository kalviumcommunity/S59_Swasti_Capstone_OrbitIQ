import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import "../css/Loader.css"

const API_URI = `${import.meta.env.VITE_API_URI}/user`;

function GoogleLoader() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URI}/google/login/success`);
                if (response.ok) {
                    const resp = await response.json();
                    const { Username, UserId, Email ,Image} = resp
                    sessionStorage.setItem("Username", Username);
                    sessionStorage.setItem("Email", Email);
                    sessionStorage.setItem("UserId", UserId);
                    sessionStorage.setItem("GoogleImage",Image);
                    console.log(resp)

                } else {
                    console.error('Failed to fetch google user data');
                }
            } catch (error) {
                console.error('Error fetching google user data:', error);
            } finally {
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='loading'>
            <h3>Diving into Space</h3>
            <PacmanLoader color="#6FFAC9" />
        </div>

    );
}

export default GoogleLoader;
