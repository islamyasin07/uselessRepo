import { useEffect, useRef } from "react";

export default function AmbientMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.play();
  }, []);

  return (
    <audio ref={audioRef} loop autoPlay>
      <source src="../assets/sad.mp3" type="audio/mpeg" />
    </audio>
  );
}
