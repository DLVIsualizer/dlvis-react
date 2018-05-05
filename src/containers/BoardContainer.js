import React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {Board, ModelDropdown} from '../components/index';
import {API_URL} from "../config";
import axios from "axios/index";
import * as layersActions from "../store/modules/layers";
import {ModelDropdownContainer} from './index'

class BoardContainer extends React.Component {
  componentDidMount() {
    const {model_id, onAddModelGraph, onSetModel} = this.props;

    // PBW 0505_2018
    var model_name = 'ResNet50'

    axios.get(API_URL + `/layers/${model_name}`)
      .then(response => {
        onAddModelGraph(model_name, response.data);
        console.log("response", response.data);

        model_name = 'InceptionV3'
        axios.get(API_URL + `/layers/${model_name}`)
          .then(response => {
            onAddModelGraph(model_name, response.data);
            console.log("response", response.data);

            onSetModel('ResNet50');
          })

      })

  }


  render() {
    const {model_id, model_graph, onSetModel} = this.props;
    // const boardComponent =

    console.log("model_id, model_graph", model_id, model_graph && model_graph.toJS());
    return (
      <div>
        {
          (model_graph) ? <Board model_id={model_id} model_graph={model_graph.toJS()}/> : null
        }
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  model_id: state.layers.get('model_id'),
  model_graph: state.layers.get('model_graph')
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(layersActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(layersActions.setModel(modelID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

