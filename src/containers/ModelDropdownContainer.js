import React from 'react';
import {connect} from 'react-redux';
import * as modelsActions from "../store/modules/models";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import axios from "axios/index";
import {API_URL} from "../config";
import {MODEL_NAMES, IMAGE_NAMES} from "../constants";

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
    this.props.onSetImage(imgID);
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
  model_graphs: state.models.get('model_graphs')
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(modelsActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(modelsActions.setModel(modelID)),
  onSetImage: (imgID) => dispatch(modelsActions.setImage(imgID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDropdownContainer);




