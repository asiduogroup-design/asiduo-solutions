import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AnimatedBar from "../components/AnimatedBar";
import featureContent from "../data/featureContent";

const SoftwareSolutions = () => {
  const [selected, setSelected] = useState("Custom Software Development");
  const content = featureContent[selected];

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      <Sidebar selected={selected} onSelect={setSelected} />
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
              <h3 className="text-2xl font-bold mb-2">
                {b.heading}
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

export default SoftwareSolutions;
