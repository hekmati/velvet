import * as actionTypes from '../constants/actionTypes';
import { Song } from '../constants/types';


export const loadSongsRequest = () => ({
  type: actionTypes.LOAD_SONGS_REQUEST,
});

export const loadSongsSuccess = (
  response,
) => ({
  type: actionTypes.LOAD_SONGS_SUCCESS,
  response,
});

export const loadSongsFailure = errorMessage => ({
  type: actionTypes.LOAD_SONGS_FAILURE,
  errorMessage,
});

export const selectSong = (id) => ({
  type: actionTypes.SELECT_SONG,
  id,
});

export const prevSong = (songs: Song[]) => ({
  type: actionTypes.PREV_SONG,
  songs,
});

export const nextSong = (songs: Song[]) => ({
  type: actionTypes.NEXT_SONG,
  songs,
});


