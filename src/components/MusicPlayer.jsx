import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function MusicPlayer({ token, uris }) {
  return (
    <SpotifyPlayer
      token={token}
      uris={uris}
      styles={{
        activeColor: '#fff',
        bgColor: '#333',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}
    />
  );
}
