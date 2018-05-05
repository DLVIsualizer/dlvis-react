import React from 'react';
import PropTypes from 'prop-types';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './ModelDropdown.scss'

const ModelDropdown = ({dropdownOpen, toggle, dropdownValue, onChangeModeldropdown, onSetModel}) => {
  let resf = function (){onChangeModeldropdown('ResNet50'),onSetModel('ResNet50') }
  let incf = function () {onChangeModeldropdown('InceptionV3'),onSetModel('InceptionV3') }
  let basf = function () {onChangeModeldropdown('Basic Convnet'),onSetModel('Basic Convnet')}
  return <div className="ModelDropdown">
    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        {dropdownValue}
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>
          <div onClick={resf}>ResNet50</div>
        </DropdownItem>
        <DropdownItem>
          <div onClick={incf}>InceptionV3</div>
        </DropdownItem>
        <DropdownItem>
          <div onClick={basf}>Basic Convnet</div>
        </DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  </div>
};

ModelDropdown.propTypes = {
  dropdownOpen: PropTypes.bool,
  toggle: PropTypes.func,
  dropdownValue: PropTypes.string,
  onChangeModeldropdown: PropTypes.func
};

ModelDropdown.defaultProps = {
  onChangeModeldropdown: () => console.warn('onChangeModeldropdown not defined')
};

export default ModelDropdown;