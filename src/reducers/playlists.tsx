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
    editedPlaylist: null,
    editedPlaylistId: null,
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
    case actionTypes.SELECT_PLAYLIST_FOR_EDIT:
      if (!action.id) {
        // Happens when the user adds a new playlist after editing an existent one
        return {
        ...state,
        editedPlaylist: null,
        editedPlaylistId: null,
      };
      }
      return {
        ...state,
        editedPlaylist: state.byId[action.id],
        editedPlaylistId: action.id,
      };
    case actionTypes.ADD_PLAYLIST_SUCCESS:
      return {
        ...state,
        idsInOrder: [...state.idsInOrder, action.response.id],
        byId: { ...state.byId, [action.response.id]: { ...action.response } },
      };

    case actionTypes.EDIT_PLAYLIST_SUCCESS:
      return {
        ...state,
        byId: { ...state.byId, [action.response.id]: { ...action.response } },
      };

    default:
      return state;
  }
};

export const getPlaylistsState = state => state.playlists;

export const getPlaylists = state => _.map(state.playlists.idsInOrder, id => state.playlists.byId[id]);

export const getIsLoadingPlaylists = state => state.playlists.isLoading;

export const getCurrentPlaylist = state => state.playlists.currentPlaylist;
