import React from 'react';
import {connect} from 'react-redux';
import * as modelsActions from "../store/modules/models";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import axios from "axios/index";
import {API_URL} from "../config";
import {MODEL_NAMES} from "../constants";

class ModelDropdownContainer extends React.Component {
  constructor(props) {
    super(props);

    this.changeModel = this.changeModel.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    };
  }

  changeModel(modelID) {
    const {model_graphs, onAddModelGraph, onSetModel} = this.props;
    console.log('called??')

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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {model_id} = this.props;

    console.log("render");
    console.log("MODEL_NAMES", MODEL_NAMES);
    return (
      <div className="ModelDropdown">
        <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
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
    )
  }
}

const mapStateToProps = (state) => ({
  model_id: state.models.get('model_id'),
  model_graphs: state.models.get('model_graphs')
});


const mapDispatchToProps = (dispatch) => ({
  onAddModelGraph: (modelID, modelGraph) => dispatch(modelsActions.addModelGraph(modelID, modelGraph)),
  onSetModel: (modelID) => dispatch(modelsActions.setModel(modelID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDropdownContainer);




