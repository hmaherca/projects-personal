import React, { Component } from 'react';

class App extends Component {

  render() {
    const songs = this.props.route.songs
    return (
      <div className="App">
        {React.cloneElement(this.props.children, { findMeInConsole: 'You found me!'})}
      </div>
    );
  }
}

export default App;
