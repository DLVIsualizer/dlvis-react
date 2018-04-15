import React, {Component} from 'react';
import './App.scss';
import { Header, Sidebar } from './components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Sidebar/>
      </div>
    );
  }
}

export default App;
