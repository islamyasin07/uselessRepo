import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";

const spotifyApi = new SpotifyWebApi();

export default function SpotifyPlayer({ token }) {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!token) return;

    spotifyApi.setAccessToken(token);

    const fetchTrack = async () => {
      try {
        const playbackState = await spotifyApi.getMyCurrentPlaybackState();
        
        if (playbackState?.item) {
          setTrack(playbackState.item);
          setIsPlaying(playbackState.is_playing);
        } else {
          setTrack(null); // No track playing
          setIsPlaying(false);
        }
      } catch (error) {
        console.error("Error fetching Spotify data:", error);
      }
    };

    // Fetch the song immediately
    fetchTrack();

    // Fetch the song every 3 seconds
    const interval = setInterval(fetchTrack, 3000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="fixed bottom-4 left-72 w-80 p-4 backdrop-blur-lg bg-black/50 rounded-lg shadow-lg text-white flex items-center space-x-3 z-50">
      {track ? (
        <div className="flex items-center space-x-3">
          <img
            src={track.album.images[0].url}
            alt="Album"
            className="w-14 h-14 rounded-lg"
          />
          <div>
            <h3 className="text-md font-bold">{track.name}</h3>
            <p className="text-sm text-gray-300">
              {track.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-xs text-gray-400">
              {isPlaying ? "🎵 Now Playing" : "⏸️ Paused"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">No song is playing</p>
      )}
    </div>
  );
}


