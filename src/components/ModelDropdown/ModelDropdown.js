import React from 'react';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './ModelDropdown.scss';
//
// class ModelDropdown extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false
//     };
//   }
//
//   toggle() {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen
//     });
//   }
//
//   render() {
//     const {onSetModel, model_id} = this.props;
//
//     return (
//       <div className="ModelDropdown">
//         <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//           {/*<DropdownToggle caret>*/}
//             {/*{model_id}*/}
//           {/*</DropdownToggle>*/}
//           {/*<DropdownMenu>*/}
//             {/*<DropdownItem onClick={()=>onSetModel(0)}>ResNet50</DropdownItem>*/}
//             {/*<DropdownItem onClick={()=>onSetModel(1)}>Basic Convnet</DropdownItem>*/}
//             {/*<DropdownItem onClick={()=>onSetModel(2)}>InceptionV3</DropdownItem>*/}
//           {/*</DropdownMenu>*/}
//         </ButtonDropdown>
//       </div>
//     );
//   }
// }
//
// export default ModelDropdown;