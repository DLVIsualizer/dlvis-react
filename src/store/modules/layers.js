import { Map, List } from 'immutable';

const ADD_LAYERS_INFO = 'ADD_LAYERS_INFO';
const CHANGE_MODEL_ID = "CHANGE_MODEL_ID";

export const addLayersInfo = (modelID, modelLayers) => ({
  type: ADD_LAYERS_INFO,
  payload: {
    id: modelID,
    layers: modelLayers
  }
});

export const changeModelID = (modelID) => ({
  type: CHANGE_MODEL_ID,
  id: modelID
});

const initialState = Map({
  model_id: 0,
  layers_info: List([])
});

const layers = (state=initialState, action) => {
  const layers_info = state.get('layers_info');

  switch(action.type) {
    case ADD_LAYERS_INFO:
      console.log("action", action);
      return state.set('layers_info', layers_info.push(
        Map({
          id: action.payload.id,
          layers: action.payload.layers
        })
      ));
    case CHANGE_MODEL_ID:
      return state.set('model_id', action.id);
    default:
      return state;
  }
};

export default layers;


