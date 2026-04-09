import React from "react";

const features = [
  "Custom Software Development",
  "Web Development",
  "Mobile App Development",
  "Software Maintenance & Support",
  "API Development & Integration",
  "Digital Marketing & SEO",
];

const Sidebar = ({ selected, onSelect }) => (
  <aside className="w-full md:w-64 bg-white shadow-lg rounded-lg p-4 mt-4 md:mt-0">
    <h2 className="text-xl font-bold text-purple-700 mb-4">Features</h2>
    <ul className="space-y-4">
      {features.map((title) => (
        <li key={title}>
          <button
            className={`w-full text-left font-semibold text-green-700 px-2 py-2 rounded transition-colors duration-200 focus:outline-none ${selected === title ? "bg-green-100" : "hover:bg-green-50"}`}
            onClick={() => onSelect(title)}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

export default Sidebar;
