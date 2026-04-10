import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SoftwareSolutions from "./pages/SoftwareSolutions";

const Home = () => (
  <div className="flex items-center justify-center h-[calc(100vh-64px)]">
    <h1 className="text-4xl font-bold text-blue-500">
      Tailwind is Working.... 🚀
    </h1>
  </div>
);

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