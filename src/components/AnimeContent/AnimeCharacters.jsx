import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const animeCharacters = [
  {
    name: "Itachi Uchiha",
    image: "/anime/itachi.jpg",
    video: "/anime/itachi.mp4",
    background: "/anime/itachi-bg.mp4",
  },
  {
    name: "Gojo Satoru",
    image: "/anime/gojo.jpg",
    video: "/anime/goju.mp4",
    background: "/anime/gojo-bg.mp4",
  },
  {
    name: "Levi Ackerman",
    image: "/anime/levi.jpg",
    video: "/anime/levi.mp4",
    background: "/anime/back-levi.mp4",
  },
  {
    name: "Kakashi Hatake",
    image: "/anime/Kakashi.jpg",
    video: "/anime/kakashi.mp4",
    background: "/anime/kakashi-bg.mp4",
  },
];

export default function AnimeCharacters({ setBackground }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex justify-center space-x-6">
      {animeCharacters.map((char, index) => (
        <motion.div
          key={index}
          className="relative w-44 h-60 rounded-xl overflow-hidden bg-black shadow-lg cursor-pointer hover:scale-110 transition-transform duration-500"
          onClick={() => {
            setActiveIndex(activeIndex === index ? null : index);
            setBackground(char.background); // 🔥 Change background video in AngelsZone
          }}
        >
          <AnimatePresence mode="wait">
            {activeIndex === index ? (
              <motion.video
                key={char.video}
                autoPlay
                controls // 🎵 Allow the user to control playback
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <source src={char.video} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.img
                key={char.image}
                src={char.image}
                alt={char.name}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>

          {/* 🔹 Character Name Label */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-center py-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {char.name}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
