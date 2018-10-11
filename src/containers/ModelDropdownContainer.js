import React from 'react';
import {connect} from 'react-redux';
import * as modelsActions from "../store/modules/models";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import SecondBoardStyle from '../components/SecondBoard/SecondBoard.scss';
import axios from "axios/index";
import {API_URL} from "../config";
import {MODEL_NAMES, IMAGE_NAMES} from "../constants";
import * as boardActions from "../store/modules/board";
import {secondEchartInstance} from "../components/SecondBoard/SecondBoard";

class ModelDropdownContainer extends React.Component {
  constructor(props) {
    super(props);

    this.changeModel = this.changeModel.bind(this);
    this.changeImage = this.changeImage.bind(this);
    this.toggleModel = this.toggleModel.bind(this);
    this.toggleImage = this.toggleImage.bind(this);

    this.state = {
      isModelDropdownOpen: false,
      isImageDropdownOpen: false
    };
  }

  clickLayer(model_id, layer_name, layer_type, img_id) {
    const {layer_name_prop,visual_mode_prop,onClickLayer} = this.props;

    if(layer_name_prop == layer_name) return;

    if(secondEchartInstance){
      secondEchartInstance.clear();
      secondEchartInstance.showLoading();
    }

    const starttime = performance.now();

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
        image_path: img_id,
        box_width:SecondBoardStyle.BoxWidth,
        box_height:SecondBoardStyle.BoxHeight,
        row_space:SecondBoardStyle.RowSpace,
        col_space:SecondBoardStyle.ColSpace
      }
    }).then(response => {
      console.log('Layer:' + layer_name+'] Response time : ' + ((performance.now() - starttime)/1000) + 's');
      const ReadMega = response.headers['content-length'] / Math.pow(2,20);
      console.log('content-length : '+ReadMega+'mb'    );
      console.log(response);
      onClickLayer(model_id, layer_name,layer_type, response);
    })
  }

  changeModel(modelID) {
    const {model_graphs, onAddModelGraph, onSetModel} = this.props;

    if (model_graphs && !model_graphs.get(modelID)) {
      axios.get(API_URL + `/layers/${modelID}`)
        .then(response => {
          onAddModelGraph(modelID, response.data);
          onSetModel(modelID);
        })
    } else {
      onSetModel(modelID)
    }
  }

  changeImage(imgID) {
    const {model_id, layer_name, layer_type, onSetImage} = this.props;
    onSetImage(imgID);
    this.clickLayer(model_id, layer_name, layer_type, imgID);
  }

  toggleModel() {
    this.setState({
      isModelDropdownOpen: !this.state.isModelDropdownOpen
    });
  }

  toggleImage() {
    this.setState({
      isImageDropdownOpen: !this.state.isImageDropdownOpen
    });
  }

  render() {
    const {img_id, model_id} = this.props;

    console.log("render");
    console.log("MODEL_NAMES", MODEL_NAMES);
    return (
      <div>
        <div className="ModelDropdown">
          <ButtonDropdown isOpen={this.state.isModelDropdownOpen} toggle={this.toggleModel}>
            <DropdownToggle caret>
              {MODEL_NAMES[model_id]}
            </DropdownToggle>
            <DropdownMenu>
              {
                MODEL_NAMES.map((model_name, idx) => {
                  return (
                    <DropdownItem key={idx}>
                      <div onClick={()=>this.changeModel(idx)}>{MODEL_NAMES[idx]}</div>
                    </DropdownItem>);
                })
              }
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <div className="ImageDropdown">
          <ButtonDropdown isOpen={this.state.isImageDropdownOpen} toggle={this.toggleImage}>
            <DropdownToggle caret>
                {IMAGE_NAMES[img_id]}
            </DropdownToggle>
            <DropdownMenu>
              {
                IMAGE_NAMES.map((img_name, idx) => {
                  return (
                    <DropdownItem key={idx}>
                      <div>
                        <img src={require('../img/'+img_name)} width="40px" height="40px"/>
                        <div className="sampleName" onClick={()=>this.changeImage(idx)}>{IMAGE_NAMES[idx]}</div>
                      </div>
                    </DropdownItem>);
                })
              }
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  img_id: state.models.get('img_id'),
  model_id: state.models.get('model_id'),
  model_graphs: state.models.get('model_graphs'),
  model_graph: state.models.get('model_graph'),
  layer_name: state.board.layer_name,
  layer_type: state.board.layer_type,
  visual_mode_prop: state.board.mode
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(modelsActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(modelsActions.setModel(modelID)),
  onSetImage: (imgID) => dispatch(modelsActions.setImage(imgID)),
  onClickLayer: (modelId, layerName,layerType,filterResponse) => dispatch(boardActions.onClickLayer(modelId, layerName,layerType,filterResponse)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDropdownContainer);




