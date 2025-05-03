import "./index.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Explore from "./Explore";
import AuthPage from "./AuthPage";
import Meta from "./components/Meta";

function App() {

return (
  <>
  <Meta />
  <Navbar/>
  <div className="max-w-screen-xl mx-auto bg-primary-200 h-screen" id="main-content">
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
