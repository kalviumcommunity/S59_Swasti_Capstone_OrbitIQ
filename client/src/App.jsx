import React from "react";
import Logo from "./assets/logo.png";
import { BarLoader } from "react-spinners";
import "./App.css";

const theme = {
  loaderColor: "#6FFAC9",
  loaderWidth: "200px",
};

const App = () => {
  return (
    <div className="loading">
      <img src={Logo} height="200px" alt="logo-image" />
      <BarLoader color={theme.loaderColor} width={theme.loaderWidth} />
    </div>
  );
};

export default App;
