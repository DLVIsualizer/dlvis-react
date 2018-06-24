import {combineReducers} from 'redux';
import sidenav from './sidenav';
import models from './models';
import board from './board';

export default combineReducers({
    sidenav,
    models,
    board,
})