import React from "react";

export default function KlarnaDashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100">
      <div className="bg-white rounded-xl shadow-2xl p-12 text-center max-w-lg">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Klarna Dashboard</h1>
        <p className="text-lg text-gray-700 mb-8">
          Questa è una dashboard di esempio per Klarna.<br/>
          Qui potresti mostrare lo stato del pagamento, dettagli dell'ordine, ecc.<br/>
          <span className="text-3xl">💳</span>
        </p>
        <a href="/it" className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition-transform">
          Torna alla Home Italiana
        </a>
      </div>
    </div>
  );
}
