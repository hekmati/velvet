import * as _ from 'lodash';
import * as actionTypes from '../constants/actionTypes';

export const songs = (
  state = {
    byId: {},
    idsInOrder: [],
    isLoading: false,
    isLoaded: false,
    errorMessage: null,
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
      };
    case actionTypes.LOAD_SONGS_SUCCESS:
      return {
        ...state,
        idsInOrder: _.map(action.response.songs, 'id'),
        byId: _.fromPairs(
          action.response.songs.map(song => {
            return [song.id, { ...song, updatingFields: {} }];
          }),
        ),
        isLoading: false,
        isLoaded: true,
        errorMessage: null,
      };
    default:
      return state;
  }
};

// export const getMachinesState = state => state.machines;
//
// export const getMachines = state => _.map(state.machines.idsInOrder, id => state.machines.byId[id]);
//
// export const getCurrentMachineId = state => state.currentMachine.id;
//
// export const getCurrentMachine = state => {
//   const currentMachineId = state.currentMachine.id;
//   return currentMachineId !== null ? state.machines.byId[currentMachineId] : null;
// };
