import React, {Component} from 'react';
import './App.scss';
import {SidenavContainer, HeaderContainer} from './containers/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SidenavContainer/>
        <HeaderContainer/>
      </div>
    );
  }
}

export default App;