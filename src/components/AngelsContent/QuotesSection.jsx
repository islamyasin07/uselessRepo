import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 🌿 Peaceful Quotes
const quotes = [
  "Inner peace begins the moment you choose not to allow another person or event to control your emotions.",
  "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
  "Every moment is a fresh beginning.",
  "Embrace the silence, and let your soul speak.",
  "Happiness is not something ready-made. It comes from your own actions.",
];

export default function QuotesSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setFade(false);
      }, 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: fade ? 0 : 1 }}
      transition={{ duration: 1 }}
      className="absolute top-1/4 right-10 max-w-lg text-white text-2xl font-semibold italic bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-md border border-white/20"
    >
      <p>{quotes[currentQuote]}</p>
    </motion.div>
  );
}
