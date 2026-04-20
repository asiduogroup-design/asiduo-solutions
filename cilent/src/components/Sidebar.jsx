import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const features = [
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "Software Maintenance & Support",
  "API Development & Integration",
  "Digital Marketing & SEO",
];

const Sidebar = ({ selected, onSelect, desktopOpen = true, setDesktopOpen }) => {
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
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
      <div className="mb-2 flex items-center space-x-3 md:hidden">
        <button
          type="button"
          className="p-2 rounded-full bg-green-100 hover:bg-green-200 shadow"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <span className="min-w-0 truncate font-bold text-base text-green-700 sm:text-lg">{selected}</span>
      </div>

      {/* Desktop Sidebar */}
      {isDesktopOpen && (
        <aside
          className="mt-4 hidden w-full rounded-lg bg-white p-4 shadow-lg md:mt-0 md:block md:w-64 md:max-h-[calc(100vh-9rem)] md:overflow-y-auto"
          onMouseLeave={hideDesktopSidebar}
        >
          <h2 className="text-xl font-bold text-purple-700 mb-4">Features</h2>
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 md:hidden">
          <div className="animate-slideIn flex h-full w-[85vw] max-w-xs flex-col bg-white p-4 shadow-lg">
            <div className="flex items-center justify-end mb-6">
              {/* Close Drawer */}
              <button type="button" onClick={() => setOpen(false)} aria-label="Close sidebar">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
                  <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold text-purple-700 mb-4">Features</h2>
            <ul className="space-y-4 overflow-y-auto pr-1">
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

export default Sidebar;
