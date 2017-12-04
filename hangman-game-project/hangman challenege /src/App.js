import React, { Component } from 'react';
import Hangman from './Hangman'
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <div className="navBar">
          <h1>HANGMAN</h1>
        </div>
        <Hangman />
      </div>
    );
  }
}

export default App;
