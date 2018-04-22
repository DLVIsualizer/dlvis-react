import React from 'react';
import {connect} from 'react-redux';
import {Board} from '../components/index';
import {getLayers} from '../services/layer';
import {addLayersInfo} from '../store/modules/layers';
import {List} from "immutable";
import {API_URL} from "../config";
import axios from "axios/index";

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {model_id, dispatch} = this.props;

    axios.get(API_URL + `/layers/${model_id}`)
      .then(response => {
        dispatch(addLayersInfo(model_id, List(response.data)));
      })
  }

  render() {
    const {model_id, layers_info} = this.props;

    return (
      <Board
        model_id={model_id}
        layers_info={layers_info}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  model_id: state.layers.get('model_id'),
  layers_info: state.layers.get('layers_info')
});

export default connect(
  mapStateToProps,
  null
)(BoardContainer);