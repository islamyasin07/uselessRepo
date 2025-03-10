import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import AngelsZone from "./pages/AngelsZone";
import EvilsHell from "./pages/EvilsHell";
import SpotifyPlayer from "./components/SpotifyPlayer";
import { AnimatePresence, motion } from "framer-motion"; // ✅ Import Framer Motion

const CLIENT_ID = "2c498c17a2cb4da5b80d0df1ce6c0564"; // Replace with your actual Client ID
const REDIRECT_URI = "http://localhost:5174/callback"; // Ensure this is in Spotify's Redirect URIs
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-modify-playback-state",
].join("%20"); // Encode spaces as "%20"

const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES}`;

export default function App() {
  const [token, setToken] = useState("");
  const [theme, setTheme] = useState("good");

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = localStorage.getItem("spotify_token");

    if (!storedToken && hash) {
      storedToken = new URLSearchParams(hash.substring(1)).get("access_token");
      window.location.hash = "";
      localStorage.setItem("spotify_token", storedToken);
    }

    setToken(storedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("spotify_token");
    setToken("");
  };

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

      {/* Spotify Player */}
      {token && <SpotifyPlayer token={token} />}

      {/* Authentication Buttons */}
      <div className="absolute top-4 right-4">
        {!token ? (
          <a
            href={LOGIN_URL}
            className="bg-green-500 text-black px-4 py-2 rounded-lg font-bold"
          >
            Login to Spotify
          </a>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
