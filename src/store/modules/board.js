const CLICK_LAYER = 'CLICK_LAYER';
const CHANGE_MODE = 'CHANGE_MODE';
const CHANGE_DEPTH = 'CHANGE_DEPTH';

export const onClickLayer = (modelId, layerName, layerType, filterResponse) => ({
  type: CLICK_LAYER,
  payload: {
    id: modelId,
    layer: layerName,
    layerType: layerType,
    filterResponse: filterResponse,
  }
});

export const onChangeMode = (modeValue, filterResponse) => ({
  type: CHANGE_MODE,
  payload: {
    mode: modeValue,
    filterResponse: filterResponse
  }
});

export const onChangeDepth = (depthValue,filterResponse) => ({
  type: CHANGE_DEPTH,
  payload: {
    depth: depthValue,
    filterResponse: filterResponse
  }
});

const initialState = {
  layer_name: '',
  layer_type: undefined,
  filterResponse: undefined,
  mode: 0,
  depth: 0
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_LAYER:
      return {
        ...state,
        layer_name: action.payload.layer,
        layer_type: action.payload.layerType,
        filterResponse: action.payload.filterResponse,
        depth: 0
      };
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload.mode,
        filterResponse: action.payload.filterResponse
      }
    case CHANGE_DEPTH:
      return {
        ...state,
        depth: action.payload.depth,
        filterResponse: action.payload.filterResponse
      };
    default:
      return state;
  }
};

export default board;