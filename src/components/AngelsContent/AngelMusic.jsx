import { useState, useRef } from "react";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa"; // 🎵 Music icons

export default function AngelMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio("/music/sad.mp3"));

  // 🎵 Toggle Play/Pause
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="mt-6 bg-black/40 backdrop-blur-md p-4 rounded-lg shadow-md flex items-center justify-between">
      <div className="flex items-center">
        <FaMusic className="text-xl text-blue-300 animate-pulse" />
        <div className="ml-3">
          <h3 className="text-sm font-bold text-white">Angelic Melody</h3>
          <p className="text-xs text-gray-300">Calm & Soothing</p>
        </div>
      </div>
      {/* 🎵 Play/Pause Button */}
      <button
        onClick={toggleMusic}
        className="text-white ml-2 p-2 bg-white/20 rounded-full hover:bg-white/40 transition"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
}
