import React from 'react';
import GoogleButton from 'react-google-button'

const GoogleLoginButton = () => {
  return (
    <div>
      <GoogleButton
  type="light"
  onClick={() => { console.log('Google button clicked') }}
/>
    </div>
  );
};

export default GoogleLoginButton;
