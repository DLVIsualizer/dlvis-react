import * as types from '../actions/ActionTypes';

const initialState = {
  isSidenavOpen: false,
};

const sidenav = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SIDENAV:
      console.log("toggle sidenav");
      return {
        ...state,
        isSidenavOpen: !(state.isSidenavOpen)
      };
    default:
      return state;
  }
};

export default sidenav;
