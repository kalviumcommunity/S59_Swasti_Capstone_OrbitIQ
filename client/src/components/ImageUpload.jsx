import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Jwtdecode from '../functions/jwtdecode';

const API_URI = `${import.meta.env.VITE_API_URI}/upload`;

function ImageUpload() {
    const userData = Jwtdecode();
    const userId = userData.UserId;
    const UserImage = userData.Image;
    const [file, setFile] = useState();
    const [imageURL, setImageURL] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

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
                    if (response.status === 429) {
                        throw new Error('Reached the limit! You can can change image twice a week. Try again after a week.');
                    }
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
                setError(error.message);
                setOpen(true);
            });
    };

    const getImage = () => {
        fetch(`${API_URI}/profileImage/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                const imageURL = URL.createObjectURL(blob);
                setImageURL(imageURL);
            })
            .catch(error => {
                console.error('Image Fetch Error:', error);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='profile-user-change'>
            {imageURL ? <img src={imageURL} alt="Uploaded" /> : <img src={UserImage} alt="UserImage" />}
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <Button className='Edit-button' variant='contained' startIcon={<i className='bx bx-edit'></i>} onClick={uploadImage}>Change Profile</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    {error}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ImageUpload;
