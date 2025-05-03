import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Explore from "./Explore";
import AuthPage from "./AuthPage";
import Meta from "./components/Meta";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null)
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
  <Navbar/>
  <div className="max-w-screen-lg mx-auto bg-primary-200 h-screen" id="main-content">
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
