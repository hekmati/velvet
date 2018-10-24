import { loadPlaylistsFailure, loadPlaylistsRequest, loadPlaylistsSuccess } from '../actionCreators/playlists';
import * as api from '../api';
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



