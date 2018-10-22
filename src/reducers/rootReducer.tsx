import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { songs } from './songs';
import { viewport } from './viewport';

export const rootReducer = combineReducers({
  viewport,
  songs,
  router: routerReducer,
});

export const getLocation = state => state.router.location;
