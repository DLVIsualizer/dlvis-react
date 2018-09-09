import React from 'react';
import {connect} from 'react-redux';
import {SecondBoard} from '../components/index';
import SecondBoardStyle from '../components/SecondBoard/SecondBoard.scss';
import * as boardActions from "../store/modules/board";
import {secondEchartInstance} from "../components/SecondBoard/SecondBoard";
import axios from "axios/index";
import {API_URL} from "../config";


class SecondBoardContainer extends React.Component {

  componentDidMount() {
    const {model_id, layer_name} = this.props;
  }

  changeMode(mode){
    const {onChangeMode,model_id,layer_name,layer_type,depth} = this.props;


    const starttime = performance.now()

    axios({
      method:'get',
      url:API_URL+'/layer_data/',
      responseType:'arraybuffer',
      params: {
        model_id: model_id,
        layer_name: layer_name,
        layer_type: layer_type,
        visual_mode: mode,
        visual_depth: depth,
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

        // 모델ID,레이어 이름,타입은 동일하므로 호출할 필요 없음
        // onClickLayer(model_id, layer_name,layer_type, response);

        onChangeMode(mode,response);
      })

  }

  changeDepth(depth){
    const {onChangeDepth,model_id,layer_name,layer_type,visual_mode_prop} = this.props;

    const starttime = performance.now();

    axios({
      method:'get',
      url:API_URL+'/layer_data/',
      responseType:'arraybuffer',
      params: {
        model_id: model_id,
        layer_name: layer_name,
        layer_type: layer_type,
        visual_mode: visual_mode_prop,
        visual_depth: depth,
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

        // 모델ID,레이어 이름,타입은 동일하므로 호출할 필요 없음
        onChangeDepth(depth,response);
      })
  }

  render() {
    const {model_id, layer_name, filterResponse,depth,mode} = this.props;

    return (
      <div>
        {
          <SecondBoard model_id={model_id}
                       layer_name={layer_name}
                       filterResponse={filterResponse}
                       depth = {depth}
                       mode = {mode}
                       container={this}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  model_id: state.models.get('model_id'),
  layer_name: state.board.layer_name,
  layer_type: state.board.layer_type,
  visual_mode_prop: state.board.mode,
  filterResponse: state.board.filterResponse,
  mode:state.board.mode,
  depth:state.board.depth
});


const mapDispatchToProps = (dispatch) => ({
  onClickLayer: (modelId, layerName,layerType,filterResponse) => dispatch(boardActions.onClickLayer(modelId, layerName,layerType,filterResponse)),
  onChangeMode: (mode,filterResponse) => dispatch(boardActions.onChangeMode(mode,filterResponse)),
  onChangeDepth: (depth,filterResponse) => dispatch(boardActions.onChangeDepth(depth,filterResponse)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondBoardContainer);

