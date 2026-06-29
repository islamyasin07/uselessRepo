import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import AngelsZone from "./pages/AngelsZone";
import EvilsHell from "./pages/EvilsHell";

export default function App() {
  const [theme, setTheme] = useState("good");

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <Sidebar selectedTheme={theme} onThemeChange={setTheme} />

      <main className="min-h-screen md:pl-64">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="min-h-screen"
          >
            {theme === "good" ? <AngelsZone /> : <EvilsHell />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
