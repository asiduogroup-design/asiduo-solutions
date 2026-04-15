import React from "react";

const handleChangeLanguage = () => {
  localStorage.removeItem("lang_pref");
  window.location.reload();
};

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-8 md:px-16 bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-4 text-center drop-shadow-lg">
      Benvenuto in Asiduo Solutions....
    </h1>
    <button
      onClick={handleChangeLanguage}
      className="mt-8 w-full max-w-xs sm:max-w-sm md:max-w-md px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 text-white font-bold shadow-lg hover:scale-105 transition-transform text-base sm:text-lg md:text-xl"
    >
      Cambia lingua / Change Language
    </button>
  </div>
);

export default Home;