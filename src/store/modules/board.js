import {Map, List} from 'immutable';

const CLICK_LAYER = 'CLICK_LAYER';

export const onClickLayer = (modelId, layerName, filters) => ({
  type: CLICK_LAYER,
  payload: {
    id: modelId,
    layer: layerName,
    filters: filters
  }
});


const initialState = {
  layer_name: '',
  filters: Array()
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_LAYER:
      return {
        ...state,
        filters: action.payload.filters,
        layer_name: action.payload.layer,
      };

    default:
      return state;
  }
};

export default board;