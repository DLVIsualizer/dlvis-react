import React, {Component} from 'react';
import './App.scss';
import {SidenavContainer, HeaderContainer, BoardContainer, ModelDropdownContainer} from './containers/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SidenavContainer/>
        <HeaderContainer/>
        <BoardContainer/>
        <ModelDropdownContainer/>
      </div>
    );
  }
}

export default App;