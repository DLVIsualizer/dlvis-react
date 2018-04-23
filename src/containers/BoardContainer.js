import React from 'react';
import {connect} from 'react-redux';
import {Board} from '../components/index';
import {addModelGraph, setModel} from '../store/modules/layers';
import {Map} from "immutable";
import {API_URL} from "../config";
import axios from "axios/index";

class BoardContainer extends React.Component {
  componentDidMount() {
    const {model_id, dispatch} = this.props;

    axios.get(API_URL + `/layers/${model_id}`)
      .then(response => {
        dispatch(addModelGraph(model_id, response.data));
        dispatch(setModel(model_id));
        console.log("response", response.data);
      })
  }

  render() {
    const {model_id, model_graph} = this.props;
    console.log("model_id, model_graph", model_id, model_graph.toJS());
    return (
      (model_graph)?
      <Board
        model_id={model_id}
        model_graph={model_graph.toJS()}
      /> : <div>asdf</div>
    );
  }
}

const mapStateToProps = (state) => ({
  model_id: state.layers.get('model_id'),
  model_graph: state.layers.get('model_graph')
});

export default connect(
  mapStateToProps,
  null
)(BoardContainer);