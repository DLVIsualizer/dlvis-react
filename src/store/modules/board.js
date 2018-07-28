const CLICK_LAYER = 'CLICK_LAYER';
const CHANGE_MODE= 'CHANGE_MODE';
const CHANGE_DEPTH= 'CHANGE_DEPTH';

export const onClickLayer = (modelId, layerName, filterResponse) => ({
  type: CLICK_LAYER,
  payload: {
    id: modelId,
    layer: layerName,
    filterResponse: filterResponse,
  }
});

export const onChangeMode= (modeValue) => ({
  type: CHANGE_MODE,
  mode:modeValue
});

export const onChangeDepth= (depthValue) => ({
  type: CHANGE_DEPTH,
  depth: depthValue
});

const initialState = {
  layer_name: '',
  filterResponse:undefined,
  mode:0,
  depth:0
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_LAYER:
      return {
        ...state,
        layer_name: action.payload.layer,
        filterResponse: action.payload.filterResponse,
        depth:0
      };
    case CHANGE_MODE:
      return {
        ...state,
        mode:action.mode
      }
    case CHANGE_DEPTH:
      return {
        ...state,
        depth:action.depth
      };
    default:
      return state;
  }
};

export default board;