import React, { FC, useState } from "react";
import { LibrarySongProps } from "../types";

export const LibrarySong: FC<LibrarySongProps> = ({
  song,
  onClick,
  isActive,
}) => {
  return (
    <div
      className={"library-song" + (isActive ? " active" : "")}
      onClick={onClick}
    >
      <img alt="Song cover" src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
