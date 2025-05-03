import "../index.css";
import { Link } from "react-router-dom";
import logo from "../assets/inggrisland-logo.png";

function Navbar() {
  return (
  <>
    <div className="w-full bg-primary-700 fixed z-999">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-blue-600 text-white px-4 py-2 rounded z-[1000]"
      >
        <span>
          Skip to main content
        </span>
      </a>
      <div className="max-w-screen-lg w-full mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <img src={logo} alt="InggrisLand" className="w-40" />
        </div>
    
        {/* Center: Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex flex-row gap-x-8">
          <Link to="/" className="text-white text-md font-bold hover:underline focus:underline">
            Home
          </Link>
          <Link to="/explore" className="text-white text-md font-bold hover:underline focus:underline">
            Explore
          </Link>
          <span className="text-gray-400 text-md font-bold">History</span>
          <Link to="/login" className="text-white text-md font-bold hover:underline focus:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
    <div className="h-[65px]"/>
  </>
  )
};

export default Navbar;