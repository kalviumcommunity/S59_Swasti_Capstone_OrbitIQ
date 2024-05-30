import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import SideNav from "../components/SideNavbar";
import MainDash from "../components/mainDash";
import Quiz from "../components/Quiz"
import Facts from "../components/Facts";
import IntroModule from "../components/ModuleContent";
// import SolarSystem from "../components/SolarSystem";
import Jwtdecode from "../functions/jwtdecode";

export default function Dashboard() {
  const userData = Jwtdecode();
  console.log(userData)


  return (
    <>
      <div className="p-dashboard">
        <SideNav username={userData.Username} email={userData.Email} userId={userData.UserId} GoogleImage={userData.Image} />

        <Routes>
          <Route path="/" element={<MainDash username={userData.Username} />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/module/:id" element={<IntroModule />} />
        </Routes>
      </div>
    </>
  );
}
