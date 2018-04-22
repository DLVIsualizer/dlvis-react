import React, {Component} from 'react';
import './App.scss';
import {SidenavContainer, HeaderContainer, BoardContainer} from './containers/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SidenavContainer/>
        <HeaderContainer/>
        <BoardContainer/>
      </div>
    );
  }
}

export default App;