import React from 'react';

export default function Sidebar({ onThemeChange }) {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900/30 backdrop-blur-md text-white p-6 flex flex-col justify-between border-r border-white/10 shadow-lg z-50 transition-all duration-500">
      <div>
        <h2 className="text-xl font-bold mb-4">Mood</h2>

        {/* Home Button */}
        <button className="w-full bg-white bg-opacity-20 text-white py-2 rounded-lg font-bold hover:bg-opacity-40 transition flex items-center px-4">
          <div className="w-5 h-5 bg-white rounded mr-2"></div> Home
        </button>

        {/* Theme Switcher */}
        <div className="mt-6">
          <h3 className="text-sm opacity-80">Theme Switcher</h3>
          <div className="mt-2 flex flex-col space-y-3">
            <button
              className="w-full flex items-center justify-between bg-white/20 py-2 px-3 rounded-lg shadow-md hover:bg-opacity-40 transition-all duration-300"
              onClick={() => onThemeChange('good')}
            >
              <span className="text-white">😇</span>
              <div className="w-8 h-8 bg-black rounded-full"></div>
            </button>
            <button
              className="w-full flex items-center justify-between bg-black/50 py-2 px-3 rounded-lg shadow-md hover:bg-opacity-70 transition-all duration-300"
              onClick={() => onThemeChange('evil')}
            >
              <span className="text-white">😈</span>
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-white/20"></div>

        {/* Music Player */}
        <div className="mt-4">
          <h3 className="text-sm opacity-80">Music</h3>
          <div className="w-full mt-2 flex items-center space-x-3 bg-black/40 backdrop-blur-md p-3 rounded-lg shadow-md">
            <img 
              src="https://i.scdn.co/image/ab67616d0000b2739b5f5c5f8f6826c8a7c74a82" 
              alt="Song" 
              className="w-10 h-10 rounded-lg transition-transform duration-300 hover:scale-105" 
            />
            <div>
              <h3 className="text-sm font-bold text-white">Swim</h3>
              <p className="text-xs text-gray-300">Chase Atlantic</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
