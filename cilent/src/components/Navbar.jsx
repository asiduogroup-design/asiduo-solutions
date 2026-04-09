import React from "react";

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
  return (
    <>
      <Topbar />
      <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow-md">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 bg-transparent" style={{ background: 'transparent' }}>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-[130px] w-auto drop-shadow-lg transition-transform duration-200 hover:scale-105 bg-transparent"
            style={{ background: 'transparent', borderRadius: 0 }}
          />
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-10">
          <a href="/software-solutions" className="text-purple-700 font-bold text-lg tracking-wide px-3 py-1 rounded hover:bg-transparent hover:text-pink-300 transition-colors duration-200 cursor-pointer shadow-sm">Software Solution</a>
          <span className="text-purple-700 font-bold text-lg tracking-wide px-3 py-1 rounded hover:bg-transparent hover:text-pink-300 transition-colors duration-200 cursor-pointer shadow-sm">Electrical Projects Consultation</span>
          <span className="text-purple-700 font-bold text-lg tracking-wide px-3 py-1 rounded hover:bg-transparent hover:text-pink-300 transition-colors duration-200 cursor-pointer shadow-sm">Graphic Design</span>
        </div>

        {/* Right: Login Icon */}
        <div className="flex items-center">
          <a
            href="https://www.flaticon.com/free-icons/log-in"
            title="log in icons"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/login-icon.png"
              alt="Login"
              className="h-[50px] w-[50px] object-contain rounded-full border-2 border-blue-200 shadow-md transition-transform duration-200 hover:scale-110"
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button id="mobile-menu-button" className="focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
