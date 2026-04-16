import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const features = [
  "Sviluppo Software Personalizzato",
  "Sviluppo Web",
  "Sviluppo Applicazioni Mobile",
  "Manutenzione e Supporto Software",
  "Sviluppo e Integrazione API",
  "Marketing Digitale e SEO",
];

const SidebarItalian = ({ selected, onSelect, desktopOpen = true, setDesktopOpen }) => {
  const [open, setOpen] = useState(false);
  //const navigate = useNavigate();
  const supportsDesktopToggle = typeof setDesktopOpen === "function";
  const isDesktopOpen = supportsDesktopToggle ? desktopOpen : true;

  const showDesktopSidebar = () => {
    if (supportsDesktopToggle) {
      setDesktopOpen(true);
    }
  };

  const hideDesktopSidebar = () => {
    if (supportsDesktopToggle) {
      setDesktopOpen(false);
    }
  };

  return (
    <>
      {!isDesktopOpen && (
        <button
          type="button"
          className="hidden md:block fixed left-0 top-0 h-screen w-3 z-40 bg-green-100/70 hover:bg-green-200 transition-colors duration-200"
          onMouseEnter={showDesktopSidebar}
          onFocus={showDesktopSidebar}
          aria-label="Show sidebar"
        />
      )}

      {/* Mobile: Sidebar Icon and Feature Name */}
      <div className="md:hidden flex items-center mb-2 space-x-3">
        <button
          className="p-2 rounded-full bg-green-100 hover:bg-green-200 shadow"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <span className="font-bold text-green-700 text-base sm:text-lg">{selected}</span>
      </div>

      {/* Desktop Sidebar */}
      {isDesktopOpen && (
        <aside
          className="hidden md:block w-full md:w-64 bg-white shadow-lg rounded-lg p-4 mt-4 md:mt-0"
          onMouseLeave={hideDesktopSidebar}
        >
          <h2 className="text-xl font-bold text-purple-700 mb-4">Funzionalità</h2>
          <ul className="space-y-4">
            {features.map((title) => (
              <li key={title}>
                <button
                  className={`w-full text-left font-semibold text-green-700 px-2 py-2 rounded transition-colors duration-200 focus:outline-none ${selected === title ? "bg-green-100" : "hover:bg-green-50"}`}
                  onClick={() => {
                    onSelect(title);
                    hideDesktopSidebar();
                  }}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-end md:hidden">
          <div className="w-64 bg-white h-full shadow-lg flex flex-col p-4 animate-slideIn">
            <div className="flex items-center justify-end mb-6">
              {/* Close Drawer */}
              <button onClick={() => setOpen(false)} aria-label="Close sidebar">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-purple-700 mb-4">Funzionalità</h2>
            <ul className="space-y-4">
              {features.map((title) => (
                <li key={title}>
                  <button
                    className={`w-full text-left font-semibold text-green-700 px-2 py-2 rounded transition-colors duration-200 focus:outline-none ${selected === title ? "bg-green-100" : "hover:bg-green-50"}`}
                    onClick={() => { onSelect(title); setOpen(false); }}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarItalian;
