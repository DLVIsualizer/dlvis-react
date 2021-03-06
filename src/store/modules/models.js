import { Map, List } from 'immutable';

const ADD_MODEL_GRAPH = 'ADD_MODEL_GRAPH';
const SET_MODEL = 'SET_MODEL';
const SET_IMAGE = 'SET IMAGE';

export const addModelGraph = (modelID, modelGraph) => ({
  type: ADD_MODEL_GRAPH,
  payload: {
    id: modelID,
    graph: modelGraph
  }
});

export const setModel = (modelID) => ({
  type: SET_MODEL,
  id: modelID
});

export const setImage = (imgID) => ({
  type: SET_IMAGE,
  id: imgID
});

const initialState = Map({
  img_id: 0,
  model_id: 0,
  model_graph: Map({
    graph: Map({}),
    tooltip: Map({})
  }),
  model_graphs: Map({})
});

const models = (state=initialState, action) => {
  const model_graphs = state.get('model_graphs');

  switch(action.type) {
    case ADD_MODEL_GRAPH:
      return state.setIn(['model_graphs', action.payload.id], Map(action.payload.graph));
    case SET_MODEL:
      return state
        .set('model_id', action.id)
        .set('model_graph', model_graphs.get(action.id));
    case SET_IMAGE:
      return state.set('img_id', action.id);
    default:
      return state;
  }
};

export default models;


