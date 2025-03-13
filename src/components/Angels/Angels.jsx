import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimeCharacters({ setBackground }) {
  const [charactersData, setCharactersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // Track the active video

  // ✅ Fetch JSON Data Dynamically
  useEffect(() => {
    fetch("/data/characters.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch characters.json");
        return response.json();
      })
      .then((data) => {
        setCharactersData(data.characters || []);
        setFilteredCharacters(data.characters.slice(0, 4));
      })
      .catch((error) => console.error("Error loading characters:", error));
  }, []);

  // ✅ Handle Search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCharacters(charactersData.slice(0, 4));
    } else {
      const filtered = charactersData.filter((char) =>
        char.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(filtered);
    }
    setActiveIndex(null); // 🛑 Stop any playing video when searching
  }, [searchTerm, charactersData]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search for a character..."
        className="p-2 rounded-lg text-white bg-black/50 mb-4 w-64 placeholder-white text-center"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🎭 Cards Grid */}
      <div className="grid grid-cols-4 gap-3">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char, index) => (
            <motion.div
              key={char.name}
              className="relative w-44 h-60 rounded-xl overflow-hidden bg-black shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
              onClick={() => {
                if (activeIndex === index) {
                  setActiveIndex(null); // 🛑 Clicking again stops the video
                } else {
                  setActiveIndex(index);
                  setBackground(char.background); // ✅ Change Background
                }
              }}
            >
              {activeIndex === index ? (
                <video
                  src={char.video}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  controls
                  autoPlay
                />
              ) : (
                <img
                  src={char.image}
                  alt={char.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                />
              )}
              <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-center py-2">
                {char.name}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white mt-4">No characters found.</p>
        )}
      </div>
    </div>
  );
}
