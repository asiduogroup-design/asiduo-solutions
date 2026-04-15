import React from "react";

const AnimatedBar = () => (
  <div className="relative h-2 w-24 sm:w-32 md:w-40 lg:w-56 mt-2 mb-6 overflow-hidden">
    <div className="absolute left-0 top-0 h-2 w-full rounded bg-gradient-to-r from-pink-400 via-purple-400 to-green-400 animate-barShimmer" />
    <style>{`
      @keyframes barShimmer {
        0% { transform: scaleX(0.2); opacity: 0.7; }
        50% { transform: scaleX(1); opacity: 1; }
        100% { transform: scaleX(0.2); opacity: 0.7; }
      }
      .animate-barShimmer {
        animation: barShimmer 2s ease-in-out infinite;
        transform-origin: left;
      }
      @keyframes fadeIn {
        from {opacity:0; transform:translateY(20px);}
        to {opacity:1; transform:translateY(0);}
      }
      .animate-fadeIn{
        animation: fadeIn 1s ease;
      }
      @keyframes fadeInSlow {
        from {opacity:0;}
        to {opacity:1;}
      }
      .animate-fadeInSlow{
        animation: fadeInSlow 2s ease;
      }
      .sparkle-gradient-text {
        background: linear-gradient(90deg,#ff6ec4,#7873f5,#42e695,#ffe29f,#ff6ec4);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: sparkle 3s linear infinite;
      }
      @keyframes sparkle{
        0%{background-position:0% 50%;}
        100%{background-position:100% 50%;}
      }
    `}</style>
  </div>
);

export default AnimatedBar;
