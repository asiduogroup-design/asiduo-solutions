import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const handleChangeLanguage = () => {
  localStorage.removeItem("lang_pref");
  window.location.reload();
};

export default function HomeItalian() {
  const [showWidget, setShowWidget] = useState(false);
  const navigate = useNavigate();

  const handleKlarnaPay = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/klarna/session");
      const { client_token, session_id } = res.data;

      setShowWidget(true);

      // Wait for Klarna JS to be available
      const waitForKlarna = () =>
        new Promise((resolve) => {
          if (window.Klarna) return resolve();
          const interval = setInterval(() => {
            if (window.Klarna) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });

      await waitForKlarna();

      window.Klarna.Payments.init({ client_token });
      window.Klarna.Payments.load({
        container: "#klarna-widget",
        payment_method_category: "pay_later", // or "pay_now", "pay_over_time"
        session_id,
      });

      // Simulate payment success (replace with real Klarna callback in production)
      setTimeout(() => {
        alert("Pagamento completato con successo! Navigazione alla dashboard...");
        navigate("/klarna-dashboard");
      }, 3000); // Simulate 3s delay for payment
    } catch (err) {
      alert("Errore durante l'integrazione Klarna");
      console.error(err);
    }
  };

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
        <br />
        {/* Button to show Klarna widget and handle payment */}
        <button
          onClick={handleKlarnaPay}
          className="mt-8 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-green-400 text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Paga con Klarna (Pagamento)
        </button>
        {/* Button to just navigate to dashboard */}
        <button
          onClick={() => navigate("/klarna-dashboard")}
          className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-transform"
        >
          Vai alla Dashboard Klarna
        </button>
        {/* Klarna widget container */}
        {showWidget && <div id="klarna-widget" className="mt-8"></div>}
      </div>
    </div>
  );
}