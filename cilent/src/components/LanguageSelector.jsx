import React, { useEffect, useState } from "react";

const funkyGradients = [
  "bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500",
  "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
];

const funkyAnimations = [
  "animate-bounce",
  "animate-pulse",
  "animate-spin"
];

export default function LanguageSelector({ onSelect }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const pref = localStorage.getItem("lang_pref");
    if (pref) setShow(false);
  }, []);

  const handleSelect = (lang) => {
    localStorage.setItem("lang_pref", lang);
    setShow(false);
    onSelect(lang);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-5xl font-extrabold text-white mb-8 animate-pulse drop-shadow-lg">
          Choose Your Language
        </h1>
        <div className="flex gap-16">
          <div
            className={`w-56 h-56 rounded-3xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 ${funkyGradients[0]} ${funkyAnimations[0]}`}
            onClick={() => handleSelect("en")}
          >
            <span className="mb-2">🇬🇧</span>
            English
          </div>
          <div
            className={`w-56 h-56 rounded-3xl flex flex-col items-center justify-center text-4xl font-bold text-white shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-110 ${funkyGradients[1]} ${funkyAnimations[1]}`}
            onClick={() => handleSelect("it")}
          >
            <span className="mb-2">🇮🇹</span>
            Italiano
          </div>
        </div>
      </div>
    </div>
  );
}
