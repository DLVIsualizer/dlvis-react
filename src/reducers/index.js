import sidenav from './sidenav';

import { combineReducers } from 'redux';

const reducers = combineReducers({
  sidenavData: sidenav
});

export default reducers;
