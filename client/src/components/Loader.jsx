import React from "react";
import Logo from "../assets/logo.png";
import { BarLoader } from "react-spinners";
import "../css/Loader.css"

const theme = {
  loaderColor: "#6FFAC9",
  loaderWidth: "200px",
};

const Loader = () => {
  return (
    <div className="loading">
      <img src={Logo} height="200px" alt="logo-image" />
      <BarLoader color={theme.loaderColor} width={theme.loaderWidth} />
    </div>
  );
};

export default Loader;
