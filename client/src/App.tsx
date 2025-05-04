import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchUserSession } from "./utils/auth";
import Home from "./Home";
import Explore from "./Explore";
import AuthPage from "./AuthPage";
import Meta from "./components/Meta";

// types/User.ts
export interface User {
  id: number;
  username: string;
  email: string;
}


function App() {
  const [user, setUser] = useState<User | null>(null);
  
  // Check if session is equal current user
  useEffect(() => {
    fetchUserSession().then(setUser);
  }, []);
  useEffect(() => {
    if (user) {
      console.log("Logged in user:", user);
    } else {
      console.log("No user logged in");
    }
  })

  // Check user login status on initial render
  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      credentials: "include", // Include the session cookie
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser(data.user); // Set user data if logged in
        console.log(data.user);
      })
      .catch(() => {
        setUser(null); // Set null if not logged in
      });
  }, []);

return (
  <>
  <Meta />
  <Navbar session={user}/>
  <div className="max-w-screen-xl mx-auto h-screen" id="main-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  </div>
  </>
)
}

export default App
