import React, { useEffect, useState } from "react";

const headingText = "Select Your Preferred Language";

export default function LanguageSelector({ onSelect }) {
  const [show, setShow] = useState(true);
  const [typedHeading, setTypedHeading] = useState("");

  useEffect(() => {
    const pref = localStorage.getItem("lang_pref");
    if (pref) setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return undefined;

    let currentIndex = 0;
    setTypedHeading("");

    const typingTimer = setInterval(() => {
      currentIndex += 1;
      setTypedHeading(headingText.slice(0, currentIndex));

      if (currentIndex >= headingText.length) {
        clearInterval(typingTimer);
      }
    }, 60);

    return () => clearInterval(typingTimer);
  }, [show]);

  const handleSelect = (lang) => {
    localStorage.setItem("lang_pref", lang);
    setShow(false);
    onSelect(lang);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black px-2 sm:px-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/software_electrical_graphic_design_background_video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 flex flex-col items-center gap-8 sm:gap-12 w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-lg text-center min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]">
          {typedHeading}
        </h1>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 w-full justify-center">
          <button
            type="button"
            className="w-full sm:w-56 h-40 sm:h-56 rounded-3xl flex items-center justify-center text-2xl sm:text-4xl font-bold text-white shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-900/40 backdrop-blur-sm bg-slate-900/75 border border-cyan-400/35 hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
            onClick={() => handleSelect("en")}
          >
            English
          </button>

          <button
            type="button"
            className="w-full sm:w-56 h-40 sm:h-56 rounded-3xl flex items-center justify-center text-2xl sm:text-4xl font-bold text-white shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-indigo-900/40 backdrop-blur-sm bg-indigo-950/70 border border-indigo-300/35 hover:bg-indigo-900/80 focus:outline-none focus:ring-2 focus:ring-indigo-300/70"
            onClick={() => handleSelect("it")}
          >
            Italiano
          </button>
        </div>
      </div>
    </div>
  );
}
