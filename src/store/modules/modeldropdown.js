const CHANGE_MODELDROPDOWN = 'CHANGE_MODELDROPDOWN';
const TOGGLE_MODELDROPDOWN = 'TOGGLE_MODELDROPDOWN';

export const changeModeldropdown = (value) => ({
  type: CHANGE_MODELDROPDOWN,
  value: value
});

export const toggleModeldropdown = () => ({
  type: TOGGLE_MODELDROPDOWN
});
const initialState = {
  model_dropdown_open: false,
  model_dropdown_value: 'ResNet50'
};

const modeldropdown = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MODELDROPDOWN:
      console.log('Changemodeldropdown', action.value);
    return {
        ...state,
        model_dropdown_value: action.value
    };
    case TOGGLE_MODELDROPDOWN:
      console.log('togglemodeldropdown');
    return {
    ...state,
      model_dropdown_open: !(state.model_dropdown_open)
    };

    default:
      return state;
  }
};

export default modeldropdown;