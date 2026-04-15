import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AnimatedBar from "../components/AnimatedBar";
import RevealText from "../components/RevealText";
import featureContent from "../data/featureContent";
import { useNavigate } from "react-router-dom";

const SoftwareSolutions = () => {
  const [selected, setSelected] = useState("Custom Software Development");
  const content = featureContent[selected];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-2 sm:p-4 md:p-8 w-full">
      {/* Home icon inside main card, top-left */}
      {/* Home icon above Features sidebar */}
      <div className="relative w-full md:w-1/3 max-w-xs md:max-w-xs lg:max-w-sm mx-auto md:mx-0">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-center mb-2">
            <span
              className="inline-block cursor-pointer"
              title="Back to Home"
              onClick={() => navigate("/")}
            >
              <i className="fa-solid fa-house" style={{ color: 'orange', fontSize: '2rem' }}></i>
            </span>
          </div>
          <Sidebar selected={selected} onSelect={setSelected} />
        </div>
      </div>
      <div className="flex-1 bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start w-full">
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
        <div className="flex justify-center md:justify-end items-start w-full mt-6 md:mt-0">
          <img
            src={content.img}
            alt={selected}
            className="w-full max-w-[220px] sm:max-w-xs md:max-w-sm rounded-lg shadow-md animate-fadeIn"
          />
        </div>
      </div>
    </div>
  );
};

export default SoftwareSolutions;
