import React, { useState } from "react";
import SidebarItalian from "../components/SidebarItalian";
import AnimatedBar from "../components/AnimatedBar";
import RevealText from "../components/RevealText";
import italianContent from "../data/italianContent";
import { useNavigate } from "react-router-dom";

const ItalianSoftwareSolutions = () => {
  const [selected, setSelected] = useState("Sviluppo Software Personalizzato");
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const content = italianContent[selected];
  const navigate = useNavigate();

  return (
    <div className="safe-mobile-padding flex w-full flex-col gap-4 py-4 sm:gap-6 sm:py-6 md:flex-row md:gap-8 md:px-8 md:py-8">
      {/* Home icon inside main card, top-left */}
      {/* Home icon above Features italianSidebar */}
      <div
        className={`relative w-full mx-auto md:mx-0 transition-all duration-300 ${desktopSidebarOpen
          ? "md:w-1/3 max-w-xs md:max-w-xs lg:max-w-sm"
          : "md:w-0 md:max-w-0 md:overflow-visible"}`}
      >
        <div
          className={`bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ${desktopSidebarOpen ? "" : "md:bg-transparent md:shadow-none md:p-0"}`}
        >
          <div className={`mb-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${desktopSidebarOpen ? "" : "md:hidden"}`}>

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
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 sm:text-base"
            >
              Paga con Nexi
            </button>

          </div>
          <SidebarItalian
            selected={selected}
            onSelect={setSelected}
            desktopOpen={desktopSidebarOpen}
            setDesktopOpen={setDesktopSidebarOpen}
          />
        </div>
      </div>

      <div className="grid w-full min-w-0 flex-1 grid-cols-1 items-start gap-4 rounded-lg bg-white p-4 shadow-lg sm:p-6 md:grid-cols-2 md:gap-8 md:p-8">
        <div>
          <h2 className="text-2xl font-extrabold text-purple-700 animate-pulse sm:text-3xl">
            {selected}
          </h2>

          <AnimatedBar />

          <p className="mb-6 mt-5 text-lg font-bold text-gray-700 animate-fadeInSlow sm:mb-8 sm:mt-6 sm:text-xl">
            {content.desc}
          </p>

          {content.bullets.map((b, i) => (
            <div key={i} className="mb-6 sm:mb-8">
              <h3 className="mb-2 text-xl font-bold text-blue-900 sm:text-2xl">
                <RevealText text={b.heading} />
              </h3>
              <p className="text-base text-gray-600 sm:text-lg">{b.content}</p>
            </div>
          ))}

        </div>

        <div className="mt-6 flex w-full items-start justify-center md:mt-0 md:justify-end">
          <img
            src={content.img}
            alt={selected}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[220px] rounded-lg shadow-md animate-fadeIn sm:max-w-xs md:max-w-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ItalianSoftwareSolutions;
