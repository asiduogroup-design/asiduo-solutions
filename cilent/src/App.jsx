import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ItalianNavbar from "./components/ItalianNavbar";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SoftwareSolutions from "./pages/SoftwareSolutions";
import ItalianSoftwareSolutions from "./pages/ItalianSoftwareSolutions";
import LanguageSelector from "./components/LanguageSelector";
import HomeItalian from "./pages/HomeItalian";
import Home from "./pages/Home";
import NexiPayment from "./pages/NexiPayment";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ItalianLoginPage from "./pages/ItalianLoginPage";
function AppRoutes({ lang, setLang }) {
  
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {

    // If Italian selected → ensure URL starts with /it
    if (lang === "it" && !location.pathname.startsWith("/it")) {
      navigate("/it", { replace: true });
    }

    // If English selected → redirect any /it page back to English home
    if (lang === "en" && location.pathname.startsWith("/it")) {
      navigate("/", { replace: true });
    }

  }, [lang, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {lang === "it" ? <ItalianNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/software-solutions" element={<SoftwareSolutions />} />        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/it/login" element={<ItalianLoginPage />} />
        <Route path="/it" element={<HomeItalian />} />
        <Route path="/it/software-solutions" element={<ItalianSoftwareSolutions />} />
        <Route
  path="/it/nexi-payment"
  element={
    <ProtectedRoute>
      <NexiPayment />
    </ProtectedRoute>
  }
/>
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