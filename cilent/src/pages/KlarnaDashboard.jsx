import React from "react";

export default function KlarnaDashboard() {
  return (
    <div className="safe-mobile-padding flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 py-20">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 text-center shadow-2xl sm:p-10 md:p-12">
        <h1 className="mb-5 text-3xl font-extrabold text-pink-600 sm:text-4xl">Klarna Dashboard</h1>
        <p className="mb-8 text-base text-gray-700 sm:text-lg">
          Questa e una dashboard di esempio per Klarna.
          <br />
          Qui potresti mostrare lo stato del pagamento, dettagli dell'ordine, ecc.
        </p>
        <a
          href="/it"
          className="inline-flex items-center rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-pink-400 px-6 py-2 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 sm:text-base"
        >
          Torna alla Home Italiana
        </a>
      </div>
    </div>
  );
}
