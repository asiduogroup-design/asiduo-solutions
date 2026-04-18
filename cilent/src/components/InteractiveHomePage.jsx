import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const COPY = {
  en: {
    heroTagline: "ONE STOP PLATFORM TO GET YOUR BUSINESS ONLINE",
    heroHeadingPrefix: "Serving Global Clients with New Age Solutions on ",
    rotatingFeatures: [
      "SEO",
      "Social Media",
      "PPC",
      "Website Design",
      "Graphic Design",
      "Mobile Apps",
      "Web Application",
    ],
    getInTouchLabel: "Get In Touch",
    changeLanguageLabel: "Change Language",
  },
  it: {
    heroTagline: "PIATTAFORMA UNICA PER PORTARE ONLINE IL TUO BUSINESS",
    heroHeadingPrefix: "Soluzioni digitali avanzate per clienti globali su ",
    rotatingFeatures: [
      "SEO",
      "Social Media",
      "PPC",
      "Siti Web",
      "Design Grafico",
      "App Mobile",
      "Web Application",
    ],
    getInTouchLabel: "Contattaci",
    changeLanguageLabel: "Cambia lingua / Change Language",
  },
};

export default function InteractiveHomePage({ locale = "en" }) {
  const navigate = useNavigate();
  const text = locale === "it" ? COPY.it : COPY.en;
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % text.rotatingFeatures.length);
    }, 1800);

    return () => clearInterval(rotationTimer);
  }, [text.rotatingFeatures.length]);

  const handleChangeLanguage = () => {
    localStorage.removeItem("lang_pref");
    window.location.reload();
  };

  const handleGetInTouch = () => {
    navigate(locale === "it" ? "/it/contact" : "/contact");
  };

  const activeFeature = text.rotatingFeatures[activeFeatureIndex] || text.rotatingFeatures[0];

  return (
    <main className="w-full overflow-x-hidden bg-slate-950 text-white">
      <section className="relative isolate flex min-h-screen min-h-dvh items-center justify-center overflow-hidden px-4 pb-10 pt-36 sm:px-6 sm:pb-12 sm:pt-40 md:px-12 md:pt-44 lg:px-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/Cinematic_Workspace_Loop_Video.mp4" type="video/mp4" />
          <source
            src="/videos/Software_Electrical_Graphic_Design_Background_Video.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-700/20 via-slate-950/55 to-slate-950/75" />

        <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-200 sm:text-sm">
            {text.heroTagline}
          </p>

          <h1 className="mt-4 break-words text-3xl font-extrabold leading-tight text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
            {text.heroHeadingPrefix}
            <span
              key={activeFeature}
              className="inline-block min-w-[8ch] text-sky-400 [animation:featureSwap_420ms_ease-out]"
            >
              {activeFeature}
            </span>
            <span className="text-sky-400">_</span>
          </h1>

          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={handleGetInTouch}
              className="w-full rounded-full border-2 border-sky-400 bg-sky-500/10 px-6 py-3 text-base font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-300 sm:w-auto sm:px-7"
            >
              {text.getInTouchLabel}
            </button>

            <button
              type="button"
              onClick={handleChangeLanguage}
              className="w-full rounded-full border border-white/50 bg-white/10 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60 sm:w-auto sm:px-7"
            >
              {text.changeLanguageLabel}
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes featureSwap {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
