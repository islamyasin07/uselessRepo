import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AngelsZone from "./pages/AngelsZone";
import EvilsHell from "./pages/EvilsHell";
import { AnimatePresence, motion } from "framer-motion"; // ✅ Import Framer Motion

export default function App() {
  const [theme, setTheme] = useState("good");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar onThemeChange={setTheme} />

      {/* 🔥 Animated Theme Switching */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme} // Changes when theme changes
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="flex-1 relative"
        >
          {theme === "good" ? <AngelsZone /> : <EvilsHell />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
