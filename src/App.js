import React, {Component} from 'react';
import './App.scss';
import {SidenavContainer, HeaderContainer, BoardContainer, SecondBoardContainer, ModelDropdownContainer} from './containers/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SidenavContainer/>
        <HeaderContainer/>
        <BoardContainer/>
        <SecondBoardContainer/>
        <ModelDropdownContainer/>
      </div>
    );
  }
}

export default App;