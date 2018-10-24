import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { playlists } from './playlists';
import { songs } from './songs';
import { viewport } from './viewport';

export const rootReducer = combineReducers({
  viewport,
  songs,
  playlists,
  router: routerReducer,
});

export const getLocation = state => state.router.location;
