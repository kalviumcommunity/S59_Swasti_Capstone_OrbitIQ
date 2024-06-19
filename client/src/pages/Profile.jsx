import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Profile.css";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useForm } from "react-hook-form";
import ImageUpload from '../components/ImageUpload';
import BackButton from '../components/backButton';
import Jwtdecode from '../functions/jwtdecode';
import Cookies from 'js-cookie';

const API_URI = `${import.meta.env.VITE_API_URI}/user`;

function Profile() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userData = Jwtdecode();
  const Username = userData.Username;
  const Email = userData.Email;
  const UserId = userData.UserId;
  const [isChangePass, setChangePass] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  const [OldPass, setOldPassword] = useState("");
  const [isVerified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClose = () => {
    setChangePass(false);
    setVerified(false);
  };

  const handleDeleteClose = () => {
    setDeleteConfirm(false);
    setVerified(false);
  };

  const checkVerified = async (callback) => {
    try {
      const response = await fetch(`${API_URI}/checkpassword/${UserId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OldPass }),
      });
      if (response.ok) {
        const data = await response.json();
        const { isPasswordMatch } = data;
        if (isPasswordMatch) {
          setVerified(true);
          setError("");
          callback();
        } else {
          setVerified(false);
          setError("Incorrect password");
        }
      } else {
        const errorMessage = await response.text();
        toast.error("Failed to verify password: " + errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred while verifying password: " + error.message);
    }
  };

  const onSubmit = async (data) => {
    if (isVerified) {
      handleUpdate(UserId, data.password);
    } else {
      toast.error("Password verification is required before updating.");
    }
  };

  const handleUpdate = async (id, newPassword) => {
    try {
      console.log(newPassword)
      const updatedObj = {
        Password: newPassword,
      };

      const response = await fetch(`${API_URI}/changeUserData/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedObj),
      });

      if (response.ok) {
        console.log(response.json());
        toast.success("Password updated successfully");
        handleClose();
      } else {
        const errorMessage = await response.text();
        toast.error("Failed to update: " + errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred while updating: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URI}/deleteUser/${UserId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Account deleted successfully");
        Cookies.remove('token');
        window.location.href = "/signup";
      } else {
        const errorMessage = await response.text();
        toast.error("Failed to delete account: " + errorMessage);
      }
    } catch (error) {
      toast.error("An error occurred while deleting account: " + error.message);
    }
  };

  const handleDeleteConfirmation = () => {
    checkVerified(handleDelete);
  };

  return (
    <div className='parent-profile-div'>
      <Dialog open={isChangePass} onClose={handleClose}>
        <DialogContent>
          <DialogTitle>Change your Password</DialogTitle>
          <form className="form-custom" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField sx={{ marginTop: "20px", width: '520px' }}
                label="Verify Your Old Password"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {!isVerified ? <Button
                        style={{ minWidth: '0' }}
                        onClick={() => checkVerified(() => { })}
                      >
                        Verify
                      </Button> : <><Typography color="green">Verified</Typography><CheckCircleOutlineIcon style={{ color: 'green', marginLeft: '3px' }} /></>}
                    </InputAdornment>
                  ),
                }}
                disabled={isVerified}
                required
              />
              {error && <Typography color="error">{error}</Typography>}
            </div>
            <div>
              <TextField sx={{ marginTop: "20px", width: '520px' }}
                label="New Password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isVerified}
                {...register("password", {
                  required: "New password is required",
                })}
              />
              {errors.password && (
                <div className="error">
                  <Typography color="error">{errors.password.message}</Typography>
                </div>
              )}
            </div>
            <div>
              <TextField sx={{ marginTop: "30px", width: '520px' }}
                label="Confirm Password"
                type="password"
                disabled={!isVerified}
                {...register("confirmpassword", {
                  required: "Confirm password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmpassword && (
                <div className="error">
                  <Typography color="error">{errors.confirmpassword.message}</Typography>
                </div>
              )}
            </div>
            <DialogActions>
              <Button type='submit' variant='contained' disabled={!isVerified}>Change Password</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isDeleteConfirm} onClose={handleDeleteClose}>
        <DialogContent>
          <DialogTitle>Delete your Account</DialogTitle>
          <Typography>Are you sure you want to delete your account? This action cannot be undone.</Typography>
          <form className="form-custom">
            <div>
              <TextField sx={{ marginTop: "20px", width: '520px' }}
                label="Verify Your Password"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              {error && <Typography color="error">{error}</Typography>}
            </div>
            <DialogActions>
              <Button onClick={handleDeleteClose} variant="outlined">Cancel</Button>
              <Button onClick={handleDeleteConfirmation} variant="contained" color="error">Delete Account</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <div className='flex-profile-div'>
        <div className='user-img-div'>
          <ImageUpload userId={UserId} />
        </div>
        <div className='user-form-update'>
          <form className="form-custom">
            <div>
              <TextField sx={{ marginTop: "70px" }}
                label="Username"
                type="text"
                value={Username}
                disabled={true}
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
              <Button onClick={() => setChangePass(true)} variant='outlined'>Change Password</Button>
              <Button onClick={() => setDeleteConfirm(true)} variant='outlined' color='error'>Delete Account</Button>
              <BackButton />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
