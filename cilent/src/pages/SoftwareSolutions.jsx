import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AnimatedBar from "../components/AnimatedBar";
import RevealText from "../components/RevealText";
import featureContent from "../data/featureContent";
import { useNavigate } from "react-router-dom";

const SoftwareSolutions = () => {
  const [selected, setSelected] = useState("Custom Software Development");
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const content = featureContent[selected];
  const navigate = useNavigate();

  return (
    <div className="safe-mobile-padding flex w-full flex-col gap-4 py-4 sm:gap-6 sm:py-6 md:flex-row md:gap-8 md:px-8 md:py-8">
      {/* Home icon inside main card, top-left */}
      {/* Home icon above Features sidebar */}
      <div
        className={`relative w-full mx-auto md:mx-0 transition-all duration-300 ${desktopSidebarOpen
          ? "md:w-1/3 max-w-xs md:max-w-xs lg:max-w-sm"
          : "md:w-0 md:max-w-0 md:overflow-visible"}`}
      >
        <div
          className={`bg-white shadow-lg rounded-lg p-4 transition-all duration-300 ${desktopSidebarOpen ? "" : "md:bg-transparent md:shadow-none md:p-0"}`}
        >
          <div className={`mb-2 flex justify-center ${desktopSidebarOpen ? "" : "md:hidden"}`}>
            <span
              className="inline-block cursor-pointer"
              title="Back to Home"
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-house" style={{ color: 'orange', fontSize: '2rem' }}></i>
            </span>
          </div>
          <Sidebar
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
        <div className="flex justify-center md:justify-end items-start w-full mt-6 md:mt-0">
          <img
            src={content.img}
            alt={selected}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[220px] sm:max-w-xs md:max-w-sm rounded-lg shadow-md animate-fadeIn"
          />
        </div>
      </div>
    </div>
  );
};

export default SoftwareSolutions;
