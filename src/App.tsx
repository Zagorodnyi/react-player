import React, { FC, useState } from "react";

import { Song, Player, Library, Nav } from "./components";
import { SkipDirection } from "./types";
import data from "./data";

import "./styles/app.scss";

const App: FC = () => {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  const skipTrack = async (direction: SkipDirection) => {
    if (direction === SkipDirection.FW && currentSong < songs.length - 1) {
      await setCurrentSong(currentSong + 1);
      return;
    }

    if (currentSong > 0 && direction === SkipDirection.BW) {
      await setCurrentSong(currentSong - 1);
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
