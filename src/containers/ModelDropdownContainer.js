import React from 'react';
import {connect} from 'react-redux';
import {ModelDropdown} from "../components/index";
import * as modeldropdownActions from "../store/modules/modeldropdown";
import * as layersActions from "../store/modules/layers";

class ModelDropdownContainer extends React.Component {
  constructor(props) {
    super(props);


  //   this.toggle = this.toggle.bind(this);
  //
  //   this.state = {
  //     dropdownOpen: false,
  //   };
  // }
  //
  // toggle() {
  //   console.log("-----------------afsaf");
  //   this.setState({
  //     dropdownOpen: !this.state.dropdownOpen
  //   });
  }

  render() {
    const {dropdownOpen,dropdownValue, onChangeModeldropdown,onToggleModeldropdown, onSetModel} = this.props;

    return <ModelDropdown dropdownOpen={dropdownOpen} toggle={onToggleModeldropdown} dropdownValue={dropdownValue}
                          onChangeModeldropdown={onChangeModeldropdown} onSetModel={onSetModel}/>
  }
}

const mapStateToProps = (state) => ({
  dropdownOpen: state.modeldropdown.model_dropdown_open,
  dropdownValue: state.modeldropdown.model_dropdown_value
});


const mapDispatchToProps = (dispatch) => ({
  onChangeModeldropdown: (value) => dispatch(modeldropdownActions.changeModeldropdown(value)),
  onToggleModeldropdown:()=>dispatch(modeldropdownActions.toggleModeldropdown()),
  onSetModel: (modelID) => dispatch(layersActions.setModel(modelID))
});



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModelDropdownContainer);




