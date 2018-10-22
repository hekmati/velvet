import * as actionTypes from '../constants/actionTypes';
import * as viewports from '../constants/viewports';

export const viewport = (state = viewports.SONGS, action) => {
  switch (action.type) {
    case actionTypes.SET_VIEWPORT:
      return action.viewport;
    default:
      return state;
  }
};

export const getViewport = state => state;
