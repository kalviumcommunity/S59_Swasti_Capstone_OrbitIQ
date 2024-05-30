import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import ErrorImage from "../assets/error.png";
import Slider1 from "../assets/Slider1.png";
import Logo_white from "../assets/Logo-white.png";
import GoogleButton from "react-google-button";
import { Link } from "react-router-dom";

const API_URI = `${import.meta.env.VITE_API_URI}/user`;

function Login() {
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
    try {
      const response = await fetch(`${API_URI}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: data.email, Password: data.password }),
        credentials: 'include'
      });

      if (response.ok) {
        const { Username, UserId, Email, token } = await response.json();
        toast.success("Authentication successful");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error("Invalid username and password");
        console.error("Login failed");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="parent-one">
        <div className="sub-div-one-sign">
          <form onSubmit={handleSubmit(onSubmit)} className="form-signUp">
            <Typography variant="h3" align="center" gutterBottom>
              Sign In
            </Typography>

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
                  <img
                    src={ErrorImage}
                    alt="Error message: Please check your credentials"
                  />
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
                  <img
                    src={ErrorImage}
                    alt="Error message: Please check your credentials"
                  />
                  <p>{errors.password.message}</p>
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
                SIGN IN
              </Button>
              <Link to="/signup">
                <p className="login">or Not a member? Register now</p>
              </Link>
            </div>
            <GoogleButton className="align-center-google" onClick={handleGoogleLogin} />
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

export default Login;
