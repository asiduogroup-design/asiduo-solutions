import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Topbar = ({ isOverlayRoute }) => (
  <div
    className={`w-full overflow-hidden py-2 sm:py-3 ${
      isOverlayRoute
        ? "bg-transparent"
        : "bg-gradient-to-r from-green-700 via-green-500 to-green-400"
    }`}
  >
    <div className="whitespace-nowrap animate-scroll px-4 text-xs font-semibold text-white sm:text-sm md:text-base">
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
  const [contactNavHasBackground, setContactNavHasBackground] = useState(false);
  const lastScrollYRef = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isContactOverlayRoute = location.pathname === "/it/contact";
  const isOverlayRoute = location.pathname === "/it" || isContactOverlayRoute;

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
    navigate("/it/login");
  };

  const desktopLinkClass = isOverlayRoute
    ? "text-white/90 hover:text-sky-300"
    : "text-purple-700 hover:text-pink-400";

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

        {/* Logo */}
        <Link to="/it" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="Asiduo Solutions"
            className="h-[56px] sm:h-[70px] md:h-[84px] w-auto drop-shadow-lg transition-transform duration-200 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center space-x-8 lg:space-x-12">

          <Link
            to="/it/software-solutions"
            className={`${desktopLinkClass} font-bold text-base md:text-lg tracking-wide transition`}
          >
            Soluzioni Software
          </Link>

          <span className={`${desktopLinkClass} font-bold text-base md:text-lg tracking-wide transition cursor-pointer`}>
            Consulenza Progetti Elettrici
          </span>

          <span className={`${desktopLinkClass} font-bold text-base md:text-lg tracking-wide transition cursor-pointer`}>
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
                className={`h-[38px] w-[38px] md:h-[44px] md:w-[44px] object-contain rounded-full shadow-md transition-transform hover:scale-110 ${
                  isOverlayRoute ? "border border-white/60" : "border border-blue-200"
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
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
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

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div
            className={`absolute left-0 top-full z-50 flex w-full flex-col items-center py-4 md:hidden ${
              isOverlayRoute ? "bg-slate-950/90 backdrop-blur-md" : "bg-white shadow-lg"
            }`}
          >

            <Link
              to="/it/software-solutions"
              className={`w-full text-center py-3 text-lg font-bold ${
                isOverlayRoute ? "text-white hover:bg-white/10" : "text-purple-700 hover:bg-purple-50"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Soluzioni Software
            </Link>

            <span
              className={`w-full text-center py-3 text-lg font-bold cursor-pointer ${
                isOverlayRoute ? "text-white hover:bg-white/10" : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              Consulenza Progetti Elettrici
            </span>

            <span
              className={`w-full text-center py-3 text-lg font-bold cursor-pointer ${
                isOverlayRoute ? "text-white hover:bg-white/10" : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              Progettazione Grafica
            </span>

            {!token && (
              <Link
                to="/it/login"
                className={`w-full text-center py-3 font-semibold ${
                  isOverlayRoute ? "text-sky-300 hover:bg-white/10" : "text-blue-600 hover:bg-blue-50"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}

            {token && (
              <button
                onClick={handleLogout}
                className={`w-full text-center py-3 font-semibold ${
                  isOverlayRoute ? "text-red-300 hover:bg-white/10" : "text-red-600 hover:bg-red-50"
                }`}
              >
                Logout
              </button>
            )}

          </div>
        )}
      </nav>
    </div>
  );
};

export default ItalianNavbar;
