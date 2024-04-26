import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
import "../css/Profile.css"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,InputAdornment , Typography} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm } from "react-hook-form";


const API_URI = `${import.meta.env.VITE_API_URI}/user`;

function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registeredData, setRegisteredData] = useState({});
  const location = useLocation();
  const { Username, Email, ProfileImg,UserId} = location.state;
  const [isChangePass, setChangePass] = useState(false);
  const [isVerified,setVerified]=useState(false);
  const [error,setError]=useState("");
  const [OldPass,setOldPassword] =useState("");
  const [newPassword,setNewPassword] =useState(Password);
  const [newUsername,setNewUsername]=useState(Username);
  const handleClose=()=>{
    setChangePass(false);
    setVerified(false);
  }
  const checkVerified = async () => {
    console.log(OldPass)
    try {
      const response = await fetch(`${API_URI}/checkpassword/${UserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({OldPass}),
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        const { isPasswordMatch } = data;
        if (isPasswordMatch) {
          setVerified(true);
          setError("");
        } else {
          setVerified(false);
          setError("Incorrect password");
        }
      } else {
        const errorMessage = await response.text();
        toast.error("Failed to verify password: " + errorMessage);
        console.error("Error:", errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred while verifying password: " + error.message);
      console.error("Error:", error);
    }
  }

  const onSubmit = async(data) => {
    setRegisteredData(data);
    console.log(data);
  };

  const handleUpdate = async (id) => {
    try {
      const updatedObj = {
        Username: registeredData.username || Username,
        Password: registeredData.password,
      };
  
      const response = await fetch(`${API_URI}/changeUserData/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedObj),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        console.log(updatedUser)
        console.log("updated");
  
        // Clear the new password field after successful update
        setNewPassword("");
      } else {
        const errorMessage = await response.text();
        toast.error("Failed to update : " + errorMessage);
        console.error("Error:", errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred while updating user: " + error.message);
      console.error("Error:", error);
    }
  };

  useEffect(()=>{
    console.log(newPassword)
  },[newPassword])
  
  return (
    <div className='parent-profile-div'>
      <Dialog open={isChangePass} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Change your Password</DialogTitle>
          <form className="form-custom" onSubmit={()=>{
            handleSubmit(onSubmit)
          }}>
            <div>
              <TextField sx={{ marginTop: "20px",width: '520px' }}
                label="Verify Your Old Password"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!isVerified?<Button
                        style={{ minWidth: '0' }}
                        onClick={checkVerified}
                      >
                        Verify
                      </Button>:<><Typography color="green">Verified</Typography><CheckCircleOutlineIcon style={{ color: 'green' ,marginLeft:'3px'}}/></>}
                    </InputAdornment>
                  ),
                }}
                disabled={isVerified}
                required
              />
              {error && <Typography color="error">{error}</Typography>}
            </div>
            <div>
              <TextField sx={{ marginTop: "20px" ,width: '520px' }}
                label="New Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isVerified}
                {...register("password", {
                  required: true,
                  // pattern: /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                  // minLength: 10,
                  // maxLength: 20,
                })}
              />
              {errors.password && (
                      <div className="error">
                        <Typography color="error">{errors.password.message}</Typography>
                      </div>
                    )}
            </div>
            <div>
              <TextField sx={{ marginTop: "30px" ,width: '520px' }}
                label="Confirm Password"
                type="password"
                disabled={!isVerified}
                {...register("confirmpassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
                
              />
              {errors.confirmpassword && (
                  <div className="error">
                    <p>{errors.confirmpassword.message}</p>
                  </div>)}
            </div>
            <DialogActions>
              <Button type='submit' variant='contained' onClick={() => handleUpdate(UserId)} >Change Password</Button>
            </DialogActions>

          </form>
        </DialogContent>
      </Dialog>
      <div className='flex-profile-div'>
        <div className='user-img-div'>
          <img src={ProfileImg} alt='profile-img' />
          <Button className='Edit-button' variant='contained' startIcon={<i className='bx bx-edit'></i>}>Change Profile</Button>
        </div>
        <div className='user-form-update'>
          <form className="form-custom">
            <div>
              <TextField sx={{ marginTop: "70px" }}
                label="Username"
                type="text"
                value={Username}
                {...register("username")}
                onChange={(e) => {setNewUsername(e.target.value)}}
                required
              />
            </div>
            <div>
              <TextField sx={{ marginTop: "30px" }}
                label="Email"
                type="text"
                value={Email}
                disabled={true}
                required
              />
            </div>
            <div className='button-save-update'>
              <Button onClick={() => setChangePass(true)}>Change Password</Button>
              <Button variant='contained' onClick={() => handleUpdate(UserId)}>Update</Button>
            </div>

          </form>

        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Profile;