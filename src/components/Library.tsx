import React, { FC } from "react";
import { LibrarySong } from ".";
import { LibraryProps } from "../types";

export const Library: FC<LibraryProps> = ({
  songs,
  libraryStatus,
  currentSongIndex,
  setCurrentSong,
}) => {
  return (
    <div className={"library " + (libraryStatus ? "active-library" : "")}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, index) => (
          <LibrarySong
            song={song}
            key={"song" + index}
            isActive={index === currentSongIndex}
            onClick={() => setCurrentSong(index)}
          />
        ))}
      </div>
    </div>
  );
};
