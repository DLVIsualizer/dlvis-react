import React from 'react';
import {connect} from 'react-redux';
import {Board, ModelDropdown} from '../components/index';
import {addModelGraph, setModel} from '../store/modules/layers';
import {Map} from "immutable";
import {API_URL} from "../config";
import axios from "axios/index";
import * as layersActions from "../store/modules/layers";
import * as sidenavActions from "../store/modules/sidenav";

class BoardContainer extends React.Component {
  componentDidMount() {
    const {model_id, onAddModelGraph, onSetModel} = this.props;

    axios.get(API_URL + `/layers/${model_id}`)
      .then(response => {
        onAddModelGraph(model_id, response.data);
        onSetModel(model_id);
        console.log("response", response.data);
      })
  }


  render() {
    const {model_id, model_graph, onSetModel} = this.props;

    // console.log("model_id, model_graph", model_id, model_graph.toJS());
    return (
      <div>
        {
          (model_graph)? <Board model_id={model_id} model_graph={model_graph.toJS()}/> : null
        }
        <ModelDropdown model_id={model_id} onSetModel={onSetModel}/>
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
  onSetModel: (modelID) => dispatch(layersActions.setModel(modelID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);