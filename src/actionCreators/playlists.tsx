import * as actionTypes from '../constants/actionTypes';

export const loadPlaylistsRequest = () => ({
  type: actionTypes.LOAD_PLAYLISTS_REQUEST,
});

export const loadPlaylistsSuccess = (
  response,
) => ({
  type: actionTypes.LOAD_PLAYLISTS_SUCCESS,
  response,
});

export const loadPlaylistsFailure = errorMessage => ({
  type: actionTypes.LOAD_PLAYLISTS_FAILURE,
  errorMessage,
});

export const selectPlaylist = (id) => ({
  type: actionTypes.SELECT_PLAYLIST,
  id,
});

