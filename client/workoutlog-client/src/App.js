import React, { useState, useEffect } from "react";
import Sitebar from "./home/Navbar";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(()=> {
    if(localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"));
    }
  }, [])

  const updateToken =(newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }

  return (
    <div>
      <Sitebar />
    </div>
  );
}

export default App;
