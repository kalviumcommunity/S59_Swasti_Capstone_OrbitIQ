import React from 'react';
import { useLocation } from 'react-router-dom';
import "../css/Profile.css"

function Profile() {
  const location = useLocation();
  const data = location.state;

  return (
    <div className='parent-profile-div'>
      <div className='flex-profile-div'>
        <div className='user-img-div'>
          <img src={data.profileImg} alt='profile-img' />
          <i class='bx bx-edit'></i>
          <h1>{data.username}</h1>
          <h3>{data.email}</h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
