import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Topbar = () => (
  <div className="w-full py-3 overflow-hidden bg-gradient-to-r from-green-700 via-green-500 to-green-400">
    <div className="whitespace-nowrap animate-scroll px-4 text-base font-semibold text-white">
      <span className="mx-8">Welcome to Asiduo Solutions!</span>
      <span className="mx-8">We provide Software Solutions, Electrical Projects Consultation, and Graphic Design Services.</span>
      <span className="mx-8">Contact us for innovative and reliable tech solutions.</span>
      <span className="mx-8">Your success is our mission!</span>
    </div>
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-scroll {
        display: inline-block;
        min-width: 100%;
        animation: scroll 20s linear infinite;
      }
    `}</style>
  </div>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Topbar />

      <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md relative">

        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 bg-transparent">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-[80px] sm:h-[100px] md:h-[130px] w-auto drop-shadow-lg transition-transform duration-200 hover:scale-105 bg-transparent"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-10">

          <Link
            to="/software-solutions"
            className="text-purple-700 font-bold text-base md:text-lg tracking-wide px-3 py-1 rounded hover:text-pink-300 transition-colors duration-200 shadow-sm"
          >
            Software Solution
          </Link>

          <span className="text-purple-700 font-bold text-base md:text-lg tracking-wide px-3 py-1 rounded hover:text-pink-300 transition-colors duration-200 shadow-sm">
            Electrical Projects Consultation
          </span>

          <span className="text-purple-700 font-bold text-base md:text-lg tracking-wide px-3 py-1 rounded hover:text-pink-300 transition-colors duration-200 shadow-sm">
            Graphic Design
          </span>

        </div>

        {/* Right: Login / Logout */}
        <div className="flex items-center gap-3">

          {!token && (
            <Link to="/login" title="Login">
              <img
                src="/images/login-icon.png"
                alt="Login"
                className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-contain rounded-full border-2 border-blue-200 shadow-md transition-transform duration-200 hover:scale-110"
              />
            </Link>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center py-4 md:hidden animate-fadeIn">

            <Link
              to="/software-solutions"
              className="w-full text-center py-2 text-purple-700 font-bold text-lg hover:bg-purple-50"
              onClick={() => setMenuOpen(false)}
            >
              Software Solution
            </Link>

            <span className="w-full text-center py-2 text-purple-700 font-bold text-lg">
              Electrical Projects Consultation
            </span>

            <span className="w-full text-center py-2 text-purple-700 font-bold text-lg">
              Graphic Design
            </span>

          </div>
        )}

      </nav>
    </>
  );
};

export default Navbar;