import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AnimatedBar from "./components/AnimatedBar";
import featureContent from "./data/featureContent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = () => (
  <div className="flex items-center justify-center h-[calc(100vh-64px)]">
    <h1 className="text-4xl font-bold text-blue-500">
      Tailwind is Working.... 🚀
    </h1>
  </div>
);



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
              <h3 className="text-2xl font-bold sparkle-gradient-text mb-2">
                <span className="typewriter">{b.heading}</span>
              </h3>

              <p className="text-gray-600 text-lg">{b.content}</p>
            </div>
          ))}
          {/* Typewriter animation style for bullet headings */}
          <style>{`
            .typewriter {
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              border-right: 2px solid #a78bfa;
              animation: typing 120s steps(30, end) 1 both, blink-caret 0.75s step-end infinite;
            }
            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }
            @keyframes blink-caret {
              from, to { border-color: transparent }
              50% { border-color: #a78bfa; }
            }
          `}</style>
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/software-solutions" element={<SoftwareSolutions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;