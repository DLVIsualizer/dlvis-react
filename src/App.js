import React, {Component} from 'react';
import './App.scss';
import {SidenavContainer, HeaderContainer, BoardContainer, SecondBoardContainer, ModelDropdownContainer} from './containers/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer/>
        <SidenavContainer/>
        <BoardContainer/>
        <SecondBoardContainer/>
        <ModelDropdownContainer/>
      </div>
    );
  }
}

export default App;