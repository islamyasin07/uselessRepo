import { useState } from "react";
import AngelMusic from "../components/AngelsContent/AngelMusic";

export default function Sidebar({ onThemeChange }) {
  const [selectedTheme, setSelectedTheme] = useState("good");

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    onThemeChange(theme);
  };

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900/30 backdrop-blur-md text-white p-6 flex flex-col justify-between border-r border-white/10 shadow-lg z-50 transition-all duration-500">
      <div>
        {/* 🌟 Sidebar Header */}
        <h2 className="text-xl font-bold mb-4 tracking-wide">Mood</h2>

        {/* 🏠 Home Button */}
        <button className="w-full bg-white bg-opacity-20 text-white py-2 rounded-lg font-bold hover:bg-opacity-40 transition flex items-center px-4">
          <div className="w-5 h-5 bg-white rounded mr-2"></div> Home
        </button>

        {/* 🎭 Theme Switcher */}
        <div className="mt-6">
          <h3 className="text-sm opacity-80">Theme Switcher</h3>
          <div className="mt-2 flex flex-col space-y-3">
            {/* Angelic Theme */}
            <button
              className={`w-full flex items-center justify-between py-2 px-3 rounded-lg shadow-md transition-all duration-300 ${
                selectedTheme === "good"
                  ? "bg-white/30 scale-105"
                  : "bg-white/20 hover:bg-opacity-40"
              }`}
              onClick={() => handleThemeChange("good")}
            >
              <span className="text-white">😇</span>
              <div className="w-8 h-8 bg-black rounded-full"></div>
            </button>

            {/* Dark Theme */}
            <button
              className={`w-full flex items-center justify-between py-2 px-3 rounded-lg shadow-md transition-all duration-300 ${
                selectedTheme === "evil"
                  ? "bg-black/70 scale-105"
                  : "bg-black/50 hover:bg-opacity-70"
              }`}
              onClick={() => handleThemeChange("evil")}
            >
              <span className="text-white">😈</span>
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </button>
          </div>
        </div>

        {/* 🔹 Divider */}
        <div className="mt-6 border-t border-white/20"></div>

        {/* 🎵 Angelic Music Player */}
        <AngelMusic />

       
    
           
          </div>
        
      
    </aside>
  );
}
