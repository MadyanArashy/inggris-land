import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Home from "./Home";
import Explore from "./Explore";
import AuthPage from "./AuthPage";
import Account from "./Account";
import Meta from "./components/Meta";
import Learn from "./Learn";
import History from "./History";

export interface User {
  id: number;
  username: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  // Check user login status on initial render
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        setUser(data.user);
        console.log("Logged in user:", data.user);
      } catch {
        setUser(null);
        console.log("No user logged in");
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      <Meta />
      <Navbar session={user} />
      <div className="max-w-screen-xl mx-auto h-screen" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/history" element={user ? <History user={user} /> : <Navigate to="/" />} />
          <Route path="/login" element={<AuthPage user={user}/>} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/learn/:id" element={<Learn user={user} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
