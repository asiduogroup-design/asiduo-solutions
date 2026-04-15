import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => (
  <div className="w-full py-3 overflow-hidden bg-gradient-to-r from-green-700 via-green-500 to-green-400">
    <div className="whitespace-nowrap animate-scroll px-4 text-sm md:text-base font-semibold text-white">
      <span className="mx-8">Benvenuti in Asiduo Solutions!</span>
      <span className="mx-8">
        Offriamo soluzioni software, consulenza per progetti elettrici e servizi
        di progettazione grafica.
      </span>
      <span className="mx-8">
        Contattateci per soluzioni tecnologiche innovative e affidabili.
      </span>
      <span className="mx-8">Il vostro successo è la nostra missione!</span>
    </div>

    <style>{`
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      .animate-scroll {
        display: inline-block;
        min-width: 100%;
        animation: scroll 25s linear infinite;
      }
    `}</style>
  </div>
);

const ItalianNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/it/login");
  };

  return (
    <>
      <Topbar />

      <nav className="w-full flex items-center justify-between px-4 md:px-8 py-3 bg-white shadow-md relative">

        {/* Logo */}
        <Link to="/it" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Asiduo Solutions"
            className="h-[70px] sm:h-[90px] md:h-[110px] w-auto drop-shadow-lg transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 lg:space-x-12">

          <Link
            to="/it/software-solutions"
            className="text-purple-700 font-bold text-base md:text-lg tracking-wide hover:text-pink-400 transition"
          >
            Soluzioni Software
          </Link>

          <span className="text-purple-700 font-bold text-base md:text-lg tracking-wide hover:text-pink-400 transition cursor-pointer">
            Consulenza Progetti Elettrici
          </span>

          <span className="text-purple-700 font-bold text-base md:text-lg tracking-wide hover:text-pink-400 transition cursor-pointer">
            Progettazione Grafica
          </span>

        </div>

        {/* Login / Logout */}
        <div className="flex items-center gap-3">

          {!token && (
            <Link to="/it/login" title="Login">
              <img
                src="/images/login-icon.png"
                alt="Login"
                className="h-[40px] w-[40px] md:h-[45px] md:w-[45px] object-contain rounded-full border border-blue-200 shadow-md transition-transform hover:scale-110"
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
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="h-7 w-7 text-gray-700"
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

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 flex flex-col items-center py-4 md:hidden">

            <Link
              to="/it/software-solutions"
              className="w-full text-center py-3 text-purple-700 font-bold text-lg hover:bg-purple-50"
              onClick={() => setMenuOpen(false)}
            >
              Soluzioni Software
            </Link>

            <span className="w-full text-center py-3 text-purple-700 font-bold text-lg hover:bg-purple-50 cursor-pointer">
              Consulenza Progetti Elettrici
            </span>

            <span className="w-full text-center py-3 text-purple-700 font-bold text-lg hover:bg-purple-50 cursor-pointer">
              Progettazione Grafica
            </span>

            {!token && (
              <Link
                to="/it/login"
                className="w-full text-center py-3 text-blue-600 font-semibold hover:bg-blue-50"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

            {token && (
              <button
                onClick={handleLogout}
                className="w-full text-center py-3 text-red-600 font-semibold hover:bg-red-50"
              >
                Logout
              </button>
            )}

          </div>
        )}
      </nav>
    </>
  );
};

export default ItalianNavbar;