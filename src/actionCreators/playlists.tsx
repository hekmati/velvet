import * as actionTypes from '../constants/actionTypes';
import { Playlist} from '../constants/types';

export const loadPlaylistsRequest = () => ({
  type: actionTypes.LOAD_PLAYLISTS_REQUEST,
});

export const loadPlaylistsSuccess = (
  response,
) => ({
  type: actionTypes.LOAD_PLAYLISTS_SUCCESS,
  response,
});

export const loadPlaylistsFailure = (errorMessage: string) => ({
  type: actionTypes.LOAD_PLAYLISTS_FAILURE,
  errorMessage,
});

export const selectPlaylist = (id: string) => ({
  type: actionTypes.SELECT_PLAYLIST,
  id,
});

export const selectPlaylistForEdit = (id: string | null) => ({
  type: actionTypes.SELECT_PLAYLIST_FOR_EDIT,
  id,
});

export const addPlaylistRequest = (playlist: Playlist) => ({
  type: actionTypes.ADD_PLAYLIST_REQUEST,
  playlist,
});

export const addPlaylistSuccess = (
  response,
) => ({
  type: actionTypes.ADD_PLAYLIST_SUCCESS,
  response,
});

export const addPlaylistFailure = (errorMessage: string) => ({
  type: actionTypes.ADD_PLAYLIST_FAILURE,
  errorMessage,
});

export const editPlaylistRequest = (playlist: Playlist) => ({
  type: actionTypes.EDIT_PLAYLIST_REQUEST,
  playlist,
});

export const editPlaylistSuccess = (
  response,
) => ({
  type: actionTypes.EDIT_PLAYLIST_SUCCESS,
  response,
});

export const editPlaylistFailure = (errorMessage: string) => ({
  type: actionTypes.EDIT_PLAYLIST_FAILURE,
  errorMessage,
});
