import React, { FC, useState } from "react";

import {
  Nav,
  Song,
  Player,
  Library,
} from "./components";
import { songsData } from "./data";
import { SkipDirection } from "./types";

import "./styles/app.scss";

const App: FC = () => {
  const [songs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const skipTrack = (direction: SkipDirection) => {
    const maxLimit = songs.length - 1;

    if (direction === SkipDirection.FW && currentSong < maxLimit) {
      setCurrentSong(currentSong + 1);
      return;
    }

    if (direction === SkipDirection.BW && currentSong > 0) {
      setCurrentSong(currentSong - 1);
    }
  };

  return (
    <div className={`App ${libraryStatus && "library-active"}`}>
      <Nav setLibraryStatus={setLibraryStatus} />
      <Song currentSong={songs[currentSong]} />
      <Player
        currentSong={songs[currentSong]}
        isPlaying={isPlaying}
        updatePlayState={setIsPlaying}
        skipTrack={skipTrack}
      />
      <Library
        songs={songs}
        libraryStatus={libraryStatus}
        currentSongIndex={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </div>
  );
};

export default App;
