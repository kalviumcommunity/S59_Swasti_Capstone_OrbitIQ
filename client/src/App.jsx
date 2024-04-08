import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Landing from "./pages/Landing";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <>{loading ? <Loader /> : <Landing />}</>;
};

export default App;
