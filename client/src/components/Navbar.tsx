import "../index.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/inggrisland-logo.png";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";

function Navbar({ session }: { session?: any }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/history", label: "History", disabled: true },
    {
      to: session ? "/account" : "/login",
      label: session ? "Account" : "Login",
    },
  ];

  return (
    <>
      <div className="w-full bg-primary-700 fixed z-[200]">
        {/* Accessibility: Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-2 left-2 bg-blue-600 text-white px-4 py-2 rounded z-[201]"
        >
          <span>Skip to main content</span>
        </a>

        <div className="max-w-screen-lg w-full mx-auto px-4 py-2 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="InggrisLand" className="w-40" />
          </div>

          {/* Burger: Mobile only */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              className="text-white p-2 rounded hover:bg-primary-600 focus:outline-none"
            >
              {menuOpen ? <RxCross1 size={24}/> : <RxHamburgerMenu size={24}/>}
            </button>
          </div>

          {/* Center: Desktop Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex flex-row gap-x-8">
            {navLinks.map(({ to, label, disabled }) => (
              <Link
                key={to}
                to={to}
                className={`text-md font-bold ${
                  disabled
                    ? "text-gray-400 pointer-events-none"
                    : location.pathname === to
                    ? "underline text-white"
                    : "text-white hover:underline focus:underline"
                }`}
                tabIndex={disabled ? -1 : undefined}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <div className="flex flex-col gap-y-4">
              {navLinks.map(({ to, label, disabled }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-md font-bold ${
                    disabled
                      ? "text-gray-400 pointer-events-none"
                      : location.pathname === to
                      ? "underline text-white"
                      : "text-white hover:underline focus:underline"
                  }`}
                  tabIndex={disabled ? -1 : undefined}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-[50px]" />
    </>
  );
}

export default Navbar;
