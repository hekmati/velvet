import * as _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';

export const songs = (
  state = {
    byId: {},
    idsInOrder: [],
    isLoading: false,
    isLoaded: false,
    errorMessage: null,
    currentSong: null,
    currentSongId: null,
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.LOAD_SONGS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
        errorMessage: null,
        currentSong: null,
        currentSongId: null,
      };
    case actionTypes.LOAD_SONGS_SUCCESS:
      return {
        ...state,
        idsInOrder: _.map(action.response, 'id'),
        byId: _.fromPairs(
          action.response.map(song => {
            return [song.id, { ...song }];
          }),
        ),
        isLoading: false,
        isLoaded: true,
        errorMessage: null,
        currentSong: null,
        currentSongId: null,
      };
    case actionTypes.SELECT_SONG:
      return {
        ...state,
        currentSong: state.byId[action.id],
        currentSongId: action.id,
      };
    case actionTypes.PREV_SONG:
      if (!state.currentSongId) {
        return state;
      }
      const prevSongIndex =
        (state.idsInOrder.indexOf(state.currentSongId) - 1 + state.idsInOrder.length) % state.idsInOrder.length;
      const prevSongId = state.idsInOrder[prevSongIndex];
      return {
        ...state,
        currentSong: state.byId[prevSongId],
        currentSongId: prevSongId,
      };
    case actionTypes.NEXT_SONG:
      if (!state.currentSongId) {
        return state;
      }
      const nextSongIndex = (state.idsInOrder.indexOf(state.currentSongId) + 1) % state.idsInOrder.length;
      const nextSongId = state.idsInOrder[nextSongIndex];
      return {
        ...state,
        currentSong: state.byId[nextSongId],
        currentSongId: nextSongId,
      };
    default:
      return state;
  }
};

export const getSongsState = state => state.songs;

export const getSongs = state => _.map(state.songs.idsInOrder, id => state.songs.byId[id]);

export const getIsLoadingSongs = state => state.songs.isLoading;

export const getCurrentSong = state => state.songs.currentSong;
