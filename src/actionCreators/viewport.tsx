import * as actionTypes from '../constants/actionTypes';

export const setViewport = (viewport: string) => ({
  type: actionTypes.SET_VIEWPORT,
  viewport,
});
