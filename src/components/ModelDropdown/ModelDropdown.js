import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './ModelDropdown.scss';

class ModelDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const {onSetModel} = this.props;

    return (
      <div className="ModelDropdown">
        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>
            Select Model
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>ResNet50</DropdownItem>
            <DropdownItem>Basic Convnet</DropdownItem>
            <DropdownItem>InceptionV3</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    );
  }
}


export default ModelDropdown;