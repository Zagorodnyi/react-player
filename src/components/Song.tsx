import React, { FC } from "react";

interface SongProps {
  currentSong: any;
}

export const Song: FC<SongProps> = ({ currentSong }) => {
  return (
    <div className="song-container">
      <img alt="Song cover" src={currentSong.cover}></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};
