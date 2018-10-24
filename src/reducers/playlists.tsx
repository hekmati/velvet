import * as _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';

export const playlists = (
  state = {
    byId: {},
    idsInOrder: [],
    isLoading: false,
    isLoaded: false,
    errorMessage: null,
    currentPlaylist: null,
    currentPlaylistId: null,
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.LOAD_PLAYLISTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errorMessage: null,
        currentPlaylist: null,
        currentPlaylistId: null,
      };
    case actionTypes.LOAD_PLAYLISTS_SUCCESS:
      return {
        ...state,
        idsInOrder: _.map(action.response, 'id'),
        byId: _.fromPairs(
          action.response.map(playlist => {
            return [playlist.id, { ...playlist }];
          }),
        ),
        isLoading: false,
        isLoaded: true,
        errorMessage: null,
        currentPlaylist: null,
        currentPlaylistId: null,
      };
    case actionTypes.SELECT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: state.byId[action.id],
        currentPlaylistId: action.id,
      };
    default:
      return state;
  }
};

export const getPlaylistsState = state => state.playlists;

export const getPlaylists = state => _.map(state.playlists.idsInOrder, id => state.playlists.byId[id]);

export const getIsLoadingPlaylists = state => state.playlists.isLoading;

export const getCurrentPlaylist = state => state.playlists.currentPlaylist;
