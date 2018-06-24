const CLICK_LAYER= 'CLICK_LAYER';

export const clickLayer= (modelId, layerName) => ({
  type: CLICK_LAYER,
  id:layerName
});

const initialState = {
  layer_name: '',
};

const board = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_LAYER:
        return  {...state,
      layer_name: action.id
    }
    default:
      return state;
  }
};

export default board;