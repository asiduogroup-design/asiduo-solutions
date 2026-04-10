import React from "react";

const handleChangeLanguage = () => {
  localStorage.removeItem("lang_pref");
  window.location.reload();
};

export default function HomeItalian() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-gradient-to-br from-yellow-200 via-pink-100 to-blue-200">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-pink-700 mb-6 drop-shadow-lg">Benvenuto!</h1>
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Soluzioni Software Innovative</h2>
        <p className="text-xl text-gray-700 mb-8">
          Siamo specializzati nello sviluppo di software personalizzato, progettazione web, app mobili e molto altro.<br/>
          La tua crescita digitale inizia qui!
        </p>
        <span className="text-2xl">🚀</span>
        <br />
        <button
          onClick={handleChangeLanguage}
          className="mt-8 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Cambia lingua / Change Language
        </button>
      </div>
    </div>
  );
}
