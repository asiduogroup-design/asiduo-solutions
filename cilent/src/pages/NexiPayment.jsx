import React from "react";

export default function NexiPayment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100">
      
      <div className="bg-white shadow-xl rounded-xl p-10 text-center">
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Pagamento Nexi
        </h1>

        <p className="text-gray-700 mb-6">
          Qui verrà integrato il sistema di pagamento Nexi.
        </p>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Procedi al pagamento
        </button>

      </div>

    </div>
  );
}