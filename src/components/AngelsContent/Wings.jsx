import { useState, useRef } from "react";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa"; // 🎵 Music icons

export default function wings() {
  
  
    return (
        <motion.section
        
        >
      
    
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
              Angels Zone
            </motion.h1>
    
            {/* Right Wing */}
            <motion.img
              src="/assets/right-wing.png"
              alt="Right Angel Wing"
              className="w-16 h-16 transform rotate-12"
              animate={{ y: [0, -5, 0], transition: { duration: 2, repeat: Infinity } }}
            />
            
          </motion.div>
        </motion.section>
      );
}
