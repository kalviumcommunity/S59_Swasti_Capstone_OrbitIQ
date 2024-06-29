import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./App.css";
import Profile from "./pages/Profile";
import GoogleLoader from "./components/GoogleLoader";
import ChatBotUI from "./pages/ChatBotUI";
import Notes from "./components/Notes";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={loading ? <Loader /> : <Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/google/success" element={<GoogleLoader/>}/>
        <Route path="/generative-ai" element={<ChatBotUI/>}/>
        <Route path ="/create-notes" element ={<Notes/>}/>
      </Routes>
    </>
  );
};

export default App;
