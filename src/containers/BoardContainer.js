import React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
import {Board, ModelDropdown} from '../components/index';
import {API_URL} from "../config";
import axios from "axios/index";
import * as layersActions from "../store/modules/models";

class BoardContainer extends React.Component {
  componentDidMount() {
    const {model_id, onAddModelGraph, onSetModel} = this.props;

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

  render() {
    const {model_id, model_graph} = this.props;

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
  model_id: state.models.get('model_id'),
  model_graph: state.models.get('model_graph')
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(layersActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(layersActions.setModel(modelID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

