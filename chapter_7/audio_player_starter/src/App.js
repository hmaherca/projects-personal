import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={()=><SongsList msg={'this is how we pass props in react router'}/>}/>
        <Route path='/:songId'render={()=><SongDetails msg={'this is how we pass props in react router'}/>}/>
      </div>
    );
  }
}

export default App;
