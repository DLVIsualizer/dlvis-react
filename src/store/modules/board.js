import {Map, List} from 'immutable';

const CLICK_LAYER = 'CLICK_LAYER';

export const onClickLayer = (modelId, layerName, filterResponse) => ({
  type: CLICK_LAYER,
  payload: {
    id: modelId,
    layer: layerName,
    filterResponse: filterResponse
  }
});


const initialState = {
  layer_name: '',
  filters:'#NODEF'
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_LAYER:
      return {
        ...state,
        filterResponse: action.payload.filterResponse,
        layer_name: action.payload.layer,
      };

    default:
      return state;
  }
};

export default board;