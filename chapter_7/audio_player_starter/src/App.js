import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import Player from './components/Player'


class App extends Component {

  constructor(){
    super();
    this.state = {
      source:0,
      isPlaying: false
    }
   this.onclick = this.onclick.bind(this)
   this.onNext = this.onNext.bind(this)
   this.playfunct=this.playfunct.bind(this)
   this.playaudio=this.playaudio.bind(this)
  }

  playaudio(){
    let song= document.getElementById('player')
    if(this.state.isPlaying){
      song.play()
    }
    else{
      song.pause()
    }
  }
  playfunct(){
    let copy = !this.state.isPlaying;
    this.setState({
      isPlaying:copy
    })
  }

  //play function (play button) for individual song on songList
  onclick(id){
    console.log(document.getElementById('the button'), 'the button was clicked')
    let song = document.getElementById('player',)
    song.play()

    this.setState({
      source: id,
      isPlaying:true
    })
  }

  onNext(){
    let id=this.state.source
    console.log(id)
    console.log(this.props.songs.length,'this is the length')
    if((this.props.songs.length-1)===id){
      id=0
    }
    else{
      id=id+1
    }
    this.setState({
      source: id
    })
  }
  
  onPrev(){
    let id=this.state.source
    if(id===0){
      id=this.props.songs.length-1
    }
    else{
      id=id-1
    }
    this.setState({
      source:id
    })
  }

  componentDidUpdate(){
   this.playaudio()
  }

  



  





  render() {
    return (
      <div className="App">
        <Route exact path="/" render={(props)=><SongsList songs={this.props.songs} onclick={this.onclick} onNext={this.onNext} />}/>
        <Route path='/:songId'render={(props)=><SongDetails match={props.match} songs={this.props.songs} source={this.state.source}/>}/>
        <p>this is where the contorls would be</p>
        {/* <Player songs={this.props.songs} source={this.state.source} id = "player"/> */}
        <button onClick={()=>{this.onPrev()}} id="the prev button">Prev</button>
        <button onClick={()=>{this.playfunct()}} id="the play button">Play</button>
        <button onClick={()=>{this.onNext()}} id="the next button">Next</button>
        <audio  src={this.props.songs[this.state.source].source} type="mp3" id="player"/>
      </div>
    );
  }
}

export default App;

//this.props.match.params.sjop
