import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Jwtdecode from '../functions/jwtdecode';

const API_URI = `${import.meta.env.VITE_API_URI}/upload`;

function ImageUpload() {
    const userData = Jwtdecode();
    const userId = userData.UserId;
    const UserImage=userData.Image;
    const [file, setFile] = useState();
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        getImage();
    }, [userId]);

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${API_URI}/updateProfileImage/${userId}`, {
            method: 'PATCH',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Upload Response:', data);
                getImage();
            })
            .catch(error => {
                console.error('Upload Error:', error);
            });
    }

    const getImage = () => {
        fetch(`${API_URI}/profileImage/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log(response)
                return response.blob();
            })
            .then(blob => {
                const imageURL = URL.createObjectURL(blob);
                console.log(imageURL)
                setImageURL(imageURL);
            })
            .catch(error => {
                console.error('Image Fetch Error:', error);
            });
    }

    return (
        <div className='profile-user-change'>
            {imageURL ? <img src={imageURL} alt="Uploaded" />:<img src={UserImage} alt="UserImage" />}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <Button className='Edit-button' variant='contained' startIcon={<i className='bx bx-edit'></i>} onClick={uploadImage}>Change Profile</Button>
        </div>
    )
}

export default ImageUpload;
