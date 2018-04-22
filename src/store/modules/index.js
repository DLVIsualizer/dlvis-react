import { combineReducers } from 'redux';
import sidenav from './sidenav';
import layers from './layers';

export default combineReducers({
  sidenav,
  layers
})