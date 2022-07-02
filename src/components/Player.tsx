import React, { FC, useRef, useState, SyntheticEvent, useEffect } from "react";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { PlayerProps, SkipDirection } from "../types";

export const Player: FC<PlayerProps> = ({
  isPlaying,
  skipTrack,
  currentSong,
  updatePlayState,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fakeButonRef = useRef<HTMLButtonElement>(null);
  const [fisrtPlay, setFirstPlay] = useState(true);
  const [songinfo, setSonginfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const getTime = (time: number) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const onPlayHandler = () => {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    updatePlayState(!isPlaying);
  };

  const handleSpacePress = (e: any) => {
    if (e.code === "Space" || e.key === 32) {
      onPlayHandler();
    }
  };

  const timeUpdateHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const current = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration || 0;

    if (current === duration && isPlaying) {
      audioRef.current?.pause();
      updatePlayState(false);

      setSonginfo({
        currentTime: 0,
        duration,
      });
      return;
    }

    setSonginfo({
      currentTime: current,
      duration,
    });
  };

  const dragHandler = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (!fisrtPlay) {
      // updatePlayState(true);
      audioRef.current?.play().catch(() => {
      // updatePlayState(true);
       return audioRef.current?.play()
      }).finally(() => updatePlayState(true))
    }
  }, [currentSong]);

  useEffect(() => {
    document.addEventListener("keydown", handleSpacePress, false);
    return () => {
      document.removeEventListener("keydown", handleSpacePress, false);
    };
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songinfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[1]} 0%, ${currentSong.color[0]} 100%)`,
          }}
        >
          <input
            min={0}
            type="range"
            max={songinfo.duration}
            value={songinfo.currentTime}
            onChange={dragHandler}
          />
          <div
            className="animate-track"
            style={{
              transform: `translateX(${
                (songinfo.currentTime / songinfo.duration) * 100
              }%)`,
            }}
          ></div>
        </div>
        <p>{getTime(songinfo.duration)}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
          onClick={() => skipTrack(SkipDirection.BW)}
        />
        <FontAwesomeIcon
          size="2x"
          className="play"
          onClick={onPlayHandler}
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          size="2x"
          icon={faAngleRight}
          className="skip-forward"
          onClick={() => skipTrack(SkipDirection.FW)}
        />
      </div>
      {/* <iframe allow="autoplay 'self'" style={{display:"none"}}></iframe> */}
      <audio
        // autoPlay={true}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onPlay={() => fisrtPlay && setFirstPlay(false)}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
      <button ref={fakeButonRef}  style={{ display: "none" }}></button>
    </div>
  );
};
