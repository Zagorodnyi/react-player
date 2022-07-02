export enum SkipDirection {
  FW,
  BW,
}

export interface PlayerProps {
  currentSong: any;
  isPlaying: boolean;
  updatePlayState: (isPlaying: boolean) => void;
  skipTrack: (direction: SkipDirection) => void;
}

export interface NavProps {
  setLibraryStatus: (ant: any) => void;
}

export interface LibrarySongProps {
  song: any;
  isActive?: boolean;
  onClick: () => void;
}

export interface LibraryProps {
  songs: any[];
  currentSongIndex: number;
  setCurrentSong: (index: number) => void;
  libraryStatus: boolean;
}
