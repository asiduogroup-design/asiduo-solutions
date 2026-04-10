import React, { useEffect } from "react";

let styleInjected = false;

const RevealText = ({ text, delay = 30, className = "" }) => {
  useEffect(() => {
    if (!styleInjected) {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes fadeInChar {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
      styleInjected = true;
    }
  }, []);

  return (
    <span className={className} key={text}>
      {text.split("").map((char, i) => (
        <span
          key={text + i}
          style={{
            opacity: 0,
            animation: `fadeInChar 0.3s forwards`,
            animationDelay: `${i * delay}ms`,
            display: "inline-block"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default RevealText;
