import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { FaFeatherAlt } from "react-icons/fa"; // Extra icon if needed
import EvilsCharacters from "../components/Evils/Evils";



const quotes = [
  "🔥 In darkness, we find clarity.",
  " I didn’t come to play fair. I came to win.",
  "🕸️ Welcome to the abyss that stares back.",
  " If I’m going down, I’m taking the whole damn kingdom with me.",
  " Mercy is a currency I never carry.",
];

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function EvilsHell() {
  const [selectedVideo, setSelectedVideo] = useState("/assets/Evil.mp4");
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  


  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, []);
  console.log("selectedVideo", selectedVideo);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
    


      {/* 🎥 Live Video Background */}

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={selectedVideo} type="video/mp4" />
    



        Your browser does not support the video tag.
      </video>

      {/* 🖤 Overlay for Readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">

</div>


      {/* 📌 Content Positioned Beside Sidebar */}
      <div className="absolute top-20 left-72 text-white z-10">
        <h1 className="text-5xl font-bold drop-shadow-lg">Evil'l Hell</h1>
        <p className="text-lg opacity-80 mt-2">Before I'm alone..</p>
      </div>
      {/* 🔥 Evil Rotating Quotes */}
      <div className="absolute inset-0 bg-black/40"></div>
     

      <motion.div
        key={currentQuoteIndex}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={fadeIn}
        className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xl font-semibold text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg shadow-lg z-10 text-center"
      >
        {quotes[currentQuoteIndex]}
        
      </motion.div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
  <EvilsCharacters side="evil" setBackground={setSelectedVideo} />
</div>

    </div>
    
  );
}
