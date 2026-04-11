import React from "react";

const handleChangeLanguage = () => {
  localStorage.removeItem("lang_pref");
  window.location.reload();
};

const Home = () => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
    <h1 className="text-4xl font-bold text-blue-500 mb-4">
Welcome to Asiduo Solutions....    
</h1>
    <button
      onClick={handleChangeLanguage}
      className="mt-8 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 via-yellow-400 to-green-400 text-white font-bold shadow-lg hover:scale-105 transition-transform"
    >
      Cambia lingua / Change Language
    </button>
  </div>
);

export default Home;
