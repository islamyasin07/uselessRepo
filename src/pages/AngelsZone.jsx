import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaFeatherAlt } from "react-icons/fa"; // Extra icon if needed
import AmbientMusic from "../components/AngelsContent/AmbientMusic";
import AnimeCharacters from "../components/Angels/Angels";

const defaultBackgrounds = ["/assets/angel.mp4"];

// 🌟 List of Quotes
const quotes = [
  "✨ The soul that sees beauty may sometimes walk alone.",
  "🌿 Peace comes from within. Do not seek it without.",
  "🌌 Angels are all around us, all the time, in the very air we breathe.",
  "💫 Within you is the light of a thousand suns.",
  "🕊️ Let your dreams be your wings.",
];

// ✨ Fade-in effect for quotes
const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

// 🌠 Crossfade animation for background videos
const fadeTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
};

// 🎵 Smooth Text Animation
const textAnimation = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, type: "spring", stiffness: 100 },
  },
};

export default function AngelsZone() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(defaultBackgrounds[0]); // Holds the current background

  // 📜 Change Quote Every 8 Seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="relative w-screen h-screen flex flex-col justify-start items-center text-white p-10"
    >
      {/* 🔹 Background Video - Smooth Crossfade */}
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
        <motion.video
          key={selectedVideo}
          autoPlay
          loop
          muted={false} // ✅ Background video will now have audio!
          playsInline
          className="absolute w-full h-full object-cover transition-opacity duration-[1500ms]"
          initial="hidden"
          animate="visible"
          variants={fadeTransition}
        >
          <source src={selectedVideo} type="video/mp4" />
        </motion.video>
      </div>

      {/* 🔹 Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🎭 Animated Quotes Section */}
      <motion.div
        key={currentQuoteIndex}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeIn}
        className="absolute top-10 text-center text-xl font-semibold text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg"
      >
        {quotes[currentQuoteIndex]}
      </motion.div>

      {/* 🔹 Ambient Music */}

      {/* 🔹 Animated "Angels Zone" Title with Real Wings */}
      <motion.div
        className="absolute top-20 left-72 text-white z-10 flex items-center space-x-3"
        initial="hidden"
        animate="visible"
        variants={textAnimation}
      >
        {/* Left Wing */}
        <motion.img
          src="/assets/wing-left.webp"
          alt="Left Angel Wing"
          className="w-16 h-16 transform -rotate-12"
          animate={{ y: [0, -5, 0], transition: { duration: 2, repeat: Infinity } }}
        />

        {/* Title with Smooth Animation */}
        <motion.h1
          className="text-6xl font-bold tracking-wide"
          animate={{ scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity } }}
        >
          春馬 Zone
        </motion.h1>

        {/* Right Wing */}
        <motion.img
          src="/assets/right-wing.png"
          alt="Right Angel Wing"
          className="w-16 h-16 transform rotate-12"
          animate={{ y: [0, -5, 0], transition: { duration: 2, repeat: Infinity } }}
        />
      </motion.div>

      {/* Anime Characters Section */}
      <div className="absolute bottom-20 flex justify-center w-full">
        <AnimeCharacters setBackground={setSelectedVideo} />
      </div>
    </motion.section>
  );
}
