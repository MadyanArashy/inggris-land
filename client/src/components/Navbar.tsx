import "../index.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
  <div className="w-full bg-primary-500">
    <div className="max-w-screen-lg w-full mx-auto px-4 py-2">
      <div>
        
      </div>
      <div className="hidden md:flex flex-row justify-between max-w-lg mx-auto decoration-white">
        <Link to={"/"} className="text-white text-lg font-bold hover:underline focus:underline">
          Home
        </Link>
        <Link to={"/explore"} className="text-white text-lg font-bold hover:underline focus:underline">
          Explore
        </Link>
        <span className="text-white text-lg font-bold">
          History
        </span>
        <Link to={"/login"} className="text-white text-lg font-bold hover:underline focus:underline">
          Login
        </Link>
      </div>
    </div>
  </div>
  )
};

export default Navbar;