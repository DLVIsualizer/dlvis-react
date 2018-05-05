import {combineReducers} from 'redux';
import sidenav from './sidenav';
import layers from './layers';
import modeldropdown from './modeldropdown';

export default combineReducers({
    sidenav,
    layers,
    modeldropdown
})