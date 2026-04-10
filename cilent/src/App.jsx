import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SoftwareSolutions from "./pages/SoftwareSolutions";
import LanguageSelector from "./components/LanguageSelector";
import HomeItalian from "./pages/HomeItalian";
import Home from "./pages/Home";
import KlarnaDashboard from "./pages/KlarnaDashboard";

function AppRoutes({ lang, setLang }) {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (lang === "it" && !location.pathname.startsWith("/it")) {
      navigate("/it", { replace: true });
    } else if (lang === "en" && location.pathname === "/it") {
      navigate("/", { replace: true });
    }
  }, [lang, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/software-solutions" element={<SoftwareSolutions />} />
        <Route path="/it" element={<HomeItalian />} />
        <Route path="/klarna-dashboard" element={<KlarnaDashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang_pref") || "");
  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }
  return (
    <Router>
      <AppRoutes lang={lang} setLang={setLang} />
    </Router>
  );
}

export default App;