import {
  addPlaylistFailure,
  addPlaylistRequest,
  addPlaylistSuccess,
  editPlaylistFailure,
  editPlaylistRequest,
  editPlaylistSuccess,
  loadPlaylistsFailure,
  loadPlaylistsRequest,
  loadPlaylistsSuccess,
} from '../actionCreators/playlists';
import * as api from '../api';
import { Playlist } from '../constants/types';
import { getIsLoadingPlaylists } from '../reducers/playlists';

export const loadPlaylists = () => (dispatch, getState) => {
  if (getIsLoadingPlaylists(getState())) {
    return Promise.resolve();
  }
  dispatch(loadPlaylistsRequest());

  return api.loadPlaylists().then(
    response => dispatch(loadPlaylistsSuccess(response)),
    error => {
      dispatch(loadPlaylistsFailure(error.errorMessage));
    },
  );
};

export const addPlaylist = (playlist: Playlist) => (dispatch) => {
  dispatch(addPlaylistRequest(playlist));

  return api.addPlaylist(playlist).then(
    response => dispatch(addPlaylistSuccess(response)),
    error => {
      dispatch(addPlaylistFailure(error.errorMessage));
    },
  );
};


export const editPlaylist = (playlist: Playlist) => (dispatch) => {
  dispatch(editPlaylistRequest(playlist));

  return api.editPlaylist(playlist).then(
    response => dispatch(editPlaylistSuccess(response)),
    error => {
      dispatch(editPlaylistFailure(error.errorMessage));
    },
  );
};
