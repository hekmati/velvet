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
      let currentSongIds = action.songs.map(song => song.id);
      const prevSongIndex =
        (currentSongIds.indexOf(state.currentSongId) - 1 + action.songs.length) % action.songs.length;
      const prevSongId = currentSongIds[prevSongIndex];
      return {
        ...state,
        currentSong: state.byId[prevSongId],
        currentSongId: prevSongId,
      };
    case actionTypes.NEXT_SONG:
      currentSongIds = action.songs.map(song => song.id);
      const nextSongIndex = (currentSongIds.indexOf(state.currentSongId) + 1) % action.songs.length;
      const nextSongId = currentSongIds[nextSongIndex];
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

export const getSongsByIds = state => state.songs.byId;
