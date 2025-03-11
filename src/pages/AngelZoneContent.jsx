import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 🎥 List of clips
const clips = [
  "/assets/short.mp4",
  "/assets/girl.mp4",
];

export default function AngelZoneContent() {
  const [currentClip, setCurrentClip] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Start fade effect

      setTimeout(() => {
        setCurrentClip((prev) => (prev + 1) % clips.length);
        setFade(false); // Remove fade after transition
      }, 1000); // 1 second fade transition
    }, 15000); // Switch clip every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full flex justify-center items-center mt-8">
      {/* 🔹 Glowing Square Frame */}
      <motion.div
        key={currentClip}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: fade ? 0 : 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-[80%] max-w-3xl h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-md bg-white/10 animate-pulse"
      >
        {/* 🎥 Auto-Playing Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-xl"
        >
          <source src={clips[currentClip]} type="video/mp4" />
        </video>

        {/* 🔹 Glowing Effect */}
        <div className="absolute inset-0 rounded-xl border-4 border-blue-400/40 shadow-lg animate-pulse"></div>
      </motion.div>
    </div>
  );
}
