import React, { useState } from "react";
import SidebarItalian from "../components/SidebarItalian";
import AnimatedBar from "../components/AnimatedBar";
import RevealText from "../components/RevealText";
import italianContent from "../data/italianContent";
import { useNavigate } from "react-router-dom";

const ItalianSoftwareSolutions = () => {
  const [selected, setSelected] = useState("Sviluppo Software Personalizzato");
  const content = italianContent[selected];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Home icon inside main card, top-left */}
      {/* Home icon above Features italianSidebar */}
      <div className="relative">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-center gap-4 mb-2">

  {/* Home Icon */}
  <span
    className="inline-block cursor-pointer"
    title="Torna alla Home"
    onClick={() => navigate("/")}
  >
    <i className="fa-solid fa-house" style={{ color: "orange", fontSize: "2rem" }}></i>
  </span>

  {/* Nexi Payment Button */}
  <button
    onClick={() => navigate("/it/nexi-payment")}
    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
  >
    Paga con Nexi
  </button>

</div>
          <SidebarItalian selected={selected} onSelect={setSelected} />
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-3xl font-extrabold text-purple-700 animate-pulse">
            {selected}
          </h2>

          <AnimatedBar />

          <p className="text-gray-700 text-xl font-bold mt-6 mb-8 animate-fadeInSlow">
            {content.desc}
          </p>

          {content.bullets.map((b, i) => (
            <div key={i} className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-blue-900">
                <RevealText text={b.heading} />
              </h3>
              <p className="text-gray-600 text-lg">{b.content}</p>
            </div>
          ))}

        </div>

        <div className="flex justify-end items-start w-full">
          <img
            src={content.img}
            alt={selected}
            className="w-full max-w-xs rounded-lg shadow-md animate-fadeIn"
          />
        </div>
      </div>
    </div>
  );
};

export default ItalianSoftwareSolutions;
