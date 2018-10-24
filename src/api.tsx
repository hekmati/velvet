import { v4 } from 'node-uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  songs: [
    {
      id: v4(),
      name: 'Beat.mp3',
      artist: 'Toto',
      photoURL:
        'https://images.pexels.com/photos/65717/pexels-photo-65717.jpeg?cs=srgb&dl=band-beat-black-and-white-65717.jpg&fm=jpg',
    },
    {
      id: v4(),
      name: 'Dylan Song.mp3',
      artist: 'Bob',
      photoURL: 'https://as1.ftcdn.net/jpg/00/28/19/80/500_F_28198079_MHQJqITR1oWAiobyitknZREDBFj3iTsv.jpg',
    },
    {
      id: v4(),
      name: 'Now Or Never.mp3',
      artist: 'Michael Jackson',
      photoURL: 'https://as1.ftcdn.net/jpg/00/71/23/36/500_F_71233601_ppDlv2QqsPnKy8ujfPWV0QMFUa0r8fYo.jpg',
    },
    {
      id: v4(),
      name: 'Latino Hip-Hop.mp3',
      artist: '50 Pesos',
      photoURL: 'https://as2.ftcdn.net/jpg/00/48/45/69/500_F_48456981_NR0745pud05WOVCMpl1sUnegqHSNnhM0.jpg',
    },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const loadSongs = () =>
  delay(300).then(() => {
    return fakeDatabase.songs;
  });

