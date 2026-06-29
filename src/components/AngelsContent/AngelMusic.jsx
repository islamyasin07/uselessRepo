import { useRef, useState } from "react";
import { FaMusic, FaPause, FaPlay } from "react-icons/fa";

export default function AngelMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = async () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/music/sad.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.45;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <FaMusic className="shrink-0 text-sky-300" />
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-white">Ambient Melody</h3>
            <p className="truncate text-xs text-white/55">Calm background audio</p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleMusic}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="ml-0.5 text-xs" />}
        </button>
      </div>
    </div>
  );
}
