import * as actionTypes from '../constants/actionTypes';

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

export const prevSong = () => ({
  type: actionTypes.PREV_SONG,
});

export const nextSong = () => ({
  type: actionTypes.NEXT_SONG,
});


