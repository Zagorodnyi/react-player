import React, {
  FC,
  useRef,
  useState,
  useEffect,
  SyntheticEvent,
} from "react";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getTime } from "./utils";
import { PlayerProps, SkipDirection } from "../types";

export const Player: FC<PlayerProps> = ({
  isPlaying,
  skipTrack,
  currentSong,
  updatePlayState,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [fisrtPlay, setFirstPlay] = useState(true);
  const [songinfo, setSonginfo] = useState({
    duration: 0,
    currentTime: 0,
  });

  const onPlayHandler = () => {
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
    updatePlayState(!isPlaying);
  };

  const handleSpacePress = (e: any) => {
    if (e.code === "Space" || e.key === 32) {
      onPlayHandler();
    }
  };

  const setInitialState = () => {
    audioRef.current!.currentTime = 0;
    updatePlayState(false);
    setSonginfo((prev) => ({...prev, currentTime: 0}));
  }

  const timeUpdateHandler = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const songInfo = {
      currentTime: e.currentTarget.currentTime,
      duration: e.currentTarget.duration || 0,
    };

    if (songInfo.currentTime === songInfo.duration && isPlaying) {
      audioRef.current?.pause();
      return setInitialState();
    }

    setSonginfo(songInfo);
  };

  const dragHandler = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.currentTarget.value);
    }
  };

  const getTrackBackground = () => {
    return `linear-gradient(to right, ${currentSong.color[0]} 0%, ${currentSong.color[1]} 100%)`
  }

  useEffect(() => {
    !fisrtPlay &&
      audioRef.current
        ?.play()
        .catch(() => {
          return audioRef.current?.play();
        })
        .finally(() => updatePlayState(true));
  }, [currentSong, fisrtPlay, updatePlayState]);

  useEffect(() => {
    document.addEventListener("keydown", handleSpacePress, false);
    return () => {
      document.removeEventListener("keydown", handleSpacePress, false);
    };
    // eslint-disable-next-line
  }, [isPlaying]);

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songinfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: getTrackBackground(),
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
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onPlay={() => fisrtPlay && setFirstPlay(false)}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};
