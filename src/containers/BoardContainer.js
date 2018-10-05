import React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';
// import {Board} from '../components/index';
import {Board,SecondBoard} from '../components/index';
import {secondEchartInstance} from '../components/SecondBoard/SecondBoard';
import SecondBoardStyle from '../components/SecondBoard/SecondBoard.scss';
import {API_URL} from "../config";
import axios from "axios/index";
import * as modelActions from "../store/modules/models";
import * as boardActions from "../store/modules/board";

class BoardContainer extends React.Component {
  componentDidMount() {
    const {model_id, model_graphs, onAddModelGraph, onSetModel} = this.props;

    axios({
      method:'get',
      url:'/layers/${model_id}',
      baseURL:API_URL,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
    })
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

  clickLayer(model_id, layer_name,layer_type) {
    const {layer_name_prop,visual_mode_prop,onClickLayer} = this.props;

    if(layer_name_prop == layer_name) return;

  if(secondEchartInstance){
    secondEchartInstance.clear();
    secondEchartInstance.showLoading();
  }
    const starttime = performance.now()

    axios({
      method:'get',
      url:'/layer_data/',
      baseURL:API_URL,
      responseType:'arraybuffer',
      headers:{
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
      },
      params: {
        model_id: model_id,
        layer_name: layer_name,
        layer_type: layer_type,
        visual_mode: visual_mode_prop,
        image_path: 'undefined',
        box_width:SecondBoardStyle.BoxWidth,
        box_height:SecondBoardStyle.BoxHeight,
        row_space:SecondBoardStyle.RowSpace,
        col_space:SecondBoardStyle.ColSpace
      }
    })
      .then(response => {
        console.log('Layer:' + layer_name+'] Response time : ' + ((performance.now() - starttime)/1000) + 's');
        const ReadMega = response.headers['content-length'] / Math.pow(2,20);
        console.log('content-length : '+ReadMega+'mb'    );
        console.log(response);
        onClickLayer(model_id, layer_name,layer_type, response);
      })
  }

  render() {
    const {model_id, model_graph} = this.props;

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
  model_graph: state.models.get('model_graph'),
  layer_name_prop: state.board.layer_name,
  visual_mode_prop: state.board.mode,
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(modelActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(modelActions.setModel(modelID)),
  onClickLayer: (modelId, layerName,layerType,filterResponse) => dispatch(boardActions.onClickLayer(modelId, layerName,layerType,filterResponse)),

});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardContainer);

