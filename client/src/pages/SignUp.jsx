import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Signup.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import ErrorImage from "../assets/error.png";
import Slider1 from "../assets/Slider1.png";
import Logo_white from "../assets/Logo-white.png";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";

const API_URI = `${import.meta.env.VITE_API_URI}/user`

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registeredData, setRegisteredData] = useState({});

  const handleGoogleLogin = () => {
    window.open(`${API_URI}/google`,
      "_self")
  }

  const onSubmit = async (data) => {
    setRegisteredData(data);
    console.log("Form data:", data);
  
    try {
      console.log("Making fetch request to:", `${API_URI}/signup`);
      const response = await fetch(`${API_URI}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Username: data.name, Email: data.email, Password: data.password }),
      });
  
      console.log("Fetch request completed with status:", response.status);
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data:", responseData);
  
        const redirectUrl = responseData.redirectUrl;
        console.log("Redirecting to:", `${API_URI}/${redirectUrl}`);
        window.location.href = `${API_URI}/${redirectUrl}`;
      } else {
        console.error("Registration failed with status:", response.status);
        const errorData = await response.json();
        console.error("Error data:", errorData);
        toast.error(errorData.message || "User already registered");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  

  return (
    <>
      <div className="parent-one">
        <div className="sub-div-one-sign">
          <form onSubmit={handleSubmit(onSubmit)} className="form-signUp">
            <Typography variant="h3" align="center" gutterBottom>
              Sign Up
            </Typography>
            <div className="input-container">
              <PersonIcon className="icon" />
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    borderBottom: "1px solid white",
                    color: "white",
                    borderRadius: 0,
                  },
                }}
                {...register("name", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username cannot exceed 30 characters",
                  },
                })}
              />
              {errors.name && (
                <div className="error">
                  <img src={ErrorImage} alt="error" />
                  <p>{errors.name.message}</p>
                </div>
              )}
            </div>
            <div className="input-container">
              <EmailIcon className="icon" />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    borderBottom: "1px solid white",
                    color: "white",
                    borderRadius: 0,
                  },
                }}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <div className="error">
                  <img src={ErrorImage} alt="error" />
                  <p>{errors.email.message}</p>
                </div>
              )}
            </div>
            <div className="input-container">
              <LockIcon className="icon" />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    borderBottom: "1px solid white",
                    color: "white",
                    borderRadius: 0,
                  },
                }}
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <div className="error">
                  <img src={ErrorImage} alt="error" />
                  <p>{errors.password.message}</p>
                </div>
              )}
            </div>
            <div className="input-container">
              <LockIcon className="icon" />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{
                  style: {
                    borderBottom: "1px solid white",
                    color: "white",
                    borderRadius: 0,
                  },
                }}
                {...register("confirmpassword", {
                  required: true,
                  validate: (value) => value === watch("password"),
                })}
              />
              {errors.confirmpassword && (
                <div className="error">
                  <img src={ErrorImage} alt="error" />
                  <p>{errors.confirmpassword.message}</p>
                </div>
              )}
            </div>
            <div className="sign-up-btn">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  backgroundImage: "linear-gradient(45deg, #6FFAC9, #429477)",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "18px",
                }}
              >
                SIGN UP
              </Button>
              <Link to="/login">
                <p className="login">or I’m already a member</p>
              </Link>
            </div>
            <GoogleButton className="align-center-google" label="Sign up with google" onClick={handleGoogleLogin} />
          </form>
        </div>
        <div className="sub-div-two-sign">
          <Link to="/">
            <img
              src={Logo_white}
              className=" logo animated-up-down"
              alt="logo-white"
            />
          </Link>
          <div className="sub-flex-col">
            <p>Get ready for an interstellar adventure</p>
            <p>Don't miss out—register today and let the exploration begin!</p>

            <img src={Slider1} className="animated-up-down" alt="slider" />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUp;
