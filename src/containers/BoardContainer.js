import React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {Board} from '../components/index';
import {API_URL} from "../config";
import axios from "axios/index";
import * as modelActions from "../store/modules/models";
import * as boardActions from "../store/modules/board";

class BoardContainer extends React.Component {
  componentDidMount() {
    const {model_id, model_graphs, onAddModelGraph, onSetModel} = this.props;

    axios.get(API_URL + `/layers/${model_id}`)
      .then(response => {
        onAddModelGraph(model_id, response.data);
        onSetModel(model_id);
      })
  }

  componentWillReceiveProps(nextProps) {
    // const {model_id, model_graphs, onAddModelGraph} = this.props;
    //
    // // model id modified
    // if(!model_graphs.get(model_id)) {
    //   axios.get(API_URL + `/layers/${nextProps.model_id}`)
    //     .then(response => {
    //       onAddModelGraph(model_id, response.data);
    //     })
    // }
  }
  onClickLayer(model_id,layer_name){
    const { clickLayer} = this.props;
    clickLayer(model_id,layer_name);
  }




  render() {
    const {model_id, model_graph, clickLayer} = this.props;

    return (
      <div>
        {
          (model_graph) ?
            <Board model_id={model_id} model_graph={model_graph.toJS()} container={this}/> : null
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  model_id: state.models.get('model_id'),
  model_graph: state.models.get('model_graph')
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(modelActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(modelActions.setModel(modelID)),
  clickLayer: (modelId, layerName) => dispatch(boardActions.clickLayer(modelId, layerName))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

