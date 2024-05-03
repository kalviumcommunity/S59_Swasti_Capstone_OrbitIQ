import { Route, Routes } from "react-router-dom";
import React from "react";
import "../css/Dashboard.css";
import SideNav from "../components/SideNavbar";
import MainDash from "../components/mainDash";
import Quiz from "../components/Quiz"
import Facts from "../components/Facts";

export default function Dashboard() {
  const username = sessionStorage.getItem("Username");
  const email = sessionStorage.getItem("Email");
  const userId = sessionStorage.getItem("UserId");
  const GoogleImage = sessionStorage.getItem("GoogleImage");


  return (
    <>
      <div className="p-dashboard">
        <SideNav username={username} email={email} userId={userId} GoogleImage={GoogleImage} />
        
      <Routes>
        <Route path="/" element={<MainDash username={username} />} />
        <Route path="/quiz" element={<Quiz/>} />
        <Route path="/facts" element={<Facts/>} />
      </Routes>
      </div>
    </>
  );
}
