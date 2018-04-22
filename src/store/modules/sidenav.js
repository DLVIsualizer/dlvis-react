const TOGGLE_SIDENAV = 'TOGGLE_SIDENAV';

export const toggleSidenav = () => ({
  type: TOGGLE_SIDENAV
});

const initialState = {
  isSidenavOpen: false,
};

const sidenav = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDENAV:
      return {
        ...state,
        isSidenavOpen: !(state.isSidenavOpen)
      };
    default:
      return state;
  }
};

export default sidenav;