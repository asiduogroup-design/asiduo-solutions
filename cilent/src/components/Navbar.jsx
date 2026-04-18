import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Topbar = ({ isOverlayRoute }) => (
  <div
    className={`w-full overflow-hidden py-2 sm:py-3 ${
      isOverlayRoute
        ? "bg-transparent"
        : "bg-gradient-to-r from-green-700 via-green-500 to-green-400"
    }`}
  >
    <div className="whitespace-nowrap animate-scroll px-4 text-xs font-semibold text-white sm:text-sm md:text-base">
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
  const [contactNavHasBackground, setContactNavHasBackground] = useState(false);
  const lastScrollYRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isContactOverlayRoute = location.pathname === "/contact";
  const isOverlayRoute = location.pathname === "/" || isContactOverlayRoute;

  const token = localStorage.getItem("token");

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isContactOverlayRoute) {
      setContactNavHasBackground(false);
      return undefined;
    }

    const getHeroHeight = () => {
      const heroSection = document.getElementById("contact-hero-section");
      return heroSection?.offsetHeight || Math.round(window.innerHeight * 0.65);
    };

    let heroHeight = getHeroHeight();

    const handleResize = () => {
      heroHeight = getHeroHeight();
    };

    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const isScrollingUp = currentY < lastScrollYRef.current;
      const withinHero = currentY < Math.max(heroHeight - 120, 120);

      if (isScrollingUp) {
        setContactNavHasBackground(true);
      } else {
        setContactNavHasBackground(withinHero);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY || 0;
    setContactNavHasBackground(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isContactOverlayRoute]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const desktopLinkClass = isOverlayRoute
    ? "text-white/90 hover:text-sky-300 shadow-none"
    : "text-purple-700 hover:text-pink-300 shadow-sm";

  const navBackgroundClass = isContactOverlayRoute
    ? contactNavHasBackground
      ? "bg-slate-900/85 backdrop-blur-md shadow-lg"
      : "bg-transparent shadow-none"
    : isOverlayRoute
      ? "bg-transparent shadow-none"
      : "bg-white shadow-md";

  return (
    <div className={isOverlayRoute ? "fixed inset-x-0 top-0 z-[80]" : "relative z-40"}>
      <Topbar isOverlayRoute={isOverlayRoute} />

      <nav
        className={`relative flex w-full items-center justify-between px-3 py-2 sm:px-4 md:px-8 ${navBackgroundClass}`}
      >

        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0 bg-transparent">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-[56px] sm:h-[70px] md:h-[84px] w-auto drop-shadow-lg transition-transform duration-200 hover:scale-105 bg-transparent"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 lg:space-x-10">

          <Link
            to="/software-solutions"
            className={`${desktopLinkClass} font-bold text-base md:text-lg tracking-wide px-3 py-1 rounded transition-colors duration-200`}
          >
            Software Solution
          </Link>

          <span className={`${desktopLinkClass} font-bold text-base md:text-lg tracking-wide px-3 py-1 rounded transition-colors duration-200`}>
            Electrical Projects Consultation
          </span>

          <span className={`${desktopLinkClass} font-bold text-base md:text-lg tracking-wide px-3 py-1 rounded transition-colors duration-200`}>
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
                className={`h-[38px] w-[38px] md:h-[46px] md:w-[46px] object-contain rounded-full shadow-md transition-transform duration-200 hover:scale-110 ${
                  isOverlayRoute ? "border border-white/60" : "border-2 border-blue-200"
                }`}
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
            aria-label="Toggle menu"
          >
            <svg
              className={`h-7 w-7 ${isOverlayRoute ? "text-white" : "text-gray-700"}`}
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
          <div
            className={`absolute left-0 top-full z-50 flex w-full flex-col items-center py-4 md:hidden ${
              isOverlayRoute ? "bg-slate-950/90 backdrop-blur-md" : "bg-white shadow-lg"
            }`}
          >

            <Link
              to="/software-solutions"
              className={`w-full py-2 text-center text-lg font-bold ${
                isOverlayRoute ? "text-white hover:bg-white/10" : "text-purple-700 hover:bg-purple-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Software Solution
            </Link>

            <span
              className={`w-full py-2 text-center text-lg font-bold ${
                isOverlayRoute ? "text-white" : "text-purple-700"
              }`}
            >
              Electrical Projects Consultation
            </span>

            <span
              className={`w-full py-2 text-center text-lg font-bold ${
                isOverlayRoute ? "text-white" : "text-purple-700"
              }`}
            >
              Graphic Design
            </span>

          </div>
        )}

      </nav>
    </div>
  );
};

export default Navbar;
