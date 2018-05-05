import { Map, List } from 'immutable';

const ADD_MODEL_GRAPH = 'ADD_MODEL_GRAPH';
const SET_MODEL = 'SET_MODEL';

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

const initialState = Map({
    //PBW 0505_2018
  model_id: '',
  model_graph: Map({
    graph: Map({}),
    tooltip: Map({})
  }),
  model_graphs: Map({})
});

const layers = (state=initialState, action) => {
  const model_graphs = state.get('model_graphs');
  console.log("model_graphs!!", model_graphs.toJS());
  switch(action.type) {
    case ADD_MODEL_GRAPH:
      console.log("ADD_Model_graph");
      return state.setIn(['model_graphs', action.payload.id], Map(action.payload.graph));
    case SET_MODEL:
      console.log("set model");
      return state
        .set('model_id', action.id)
        .set('model_graph', model_graphs.get(action.id));
    default:
      return state;
  }
};

export default layers;


