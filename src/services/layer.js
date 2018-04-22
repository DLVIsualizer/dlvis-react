import axios from 'axios';
import {API_URL} from '../config';
import {addLayersInfo} from '../store/modules/layers';
import {List} from 'immutable';

export const getLayers = modelID => {
  return (dispatch) => {
    return axios.get(API_URL + `/layers/${modelID}`)
      .then(response => {
        console.log("response", response.data);
        dispatch(addLayersInfo(modelID, List(response.data)));
      })
  };
  // return axios.get(API_URL + `/layers/${modelID}`);
  // axios.get(API_URL + `/layers/${modelID}`)
  //   .then(res => {
  //     console.log("res.data", res.data);
  //     dispatch(addLayersInfo(modelID, res.data));
  //   })
};
