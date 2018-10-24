export type Song = {
  id: string;
  name: string;
  artist: string;
  photoURL: string;
};


export type Playlist = {
  id: string;
  name: string;
  songs: Song[];
};
