import { loadSongsFailure, loadSongsRequest, loadSongsSuccess } from '../actionCreators/songs';
import * as api from '../api';
import { getIsLoadingSongs } from '../reducers/songs';

export const loadSongs = () => (dispatch, getState) => {
  if (getIsLoadingSongs(getState())) {
    return Promise.resolve();
  }
  dispatch(loadSongsRequest());

  return api.loadSongs().then(
    response => dispatch(loadSongsSuccess(response)),
    error => {
      dispatch(loadSongsFailure(error.errorMessage));
    },
  );
};
