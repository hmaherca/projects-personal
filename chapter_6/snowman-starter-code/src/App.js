import React, { Component } from 'react';
import Snowman from './Snowman'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import Form from './Form'
import Highscores from './Highscores'
import Instructions from './Instructions'


const words = [
	'hey',
	'person',
	'you',
	'think',
	'youre',
	'better',
	'than',
  'me',
  'constantine',
  'chelsea',
  'poop'
];


let answer; 
let nWrong; 
let pastGuesses = [];
let pastGames = []
let cont = true;
let correctGuesses = []
let currentKey=[]
let wins;
let losses;
let str = ""
let winText = ""  


class App extends Component {
  constructor(){
    super();
    this.state = {
      answer:answer,
      pastGuesses: pastGuesses,
      correctGuesses: correctGuesses,
      nWrong: nWrong,
      pastGames: pastGames,
      currentKey: currentKey,
      wins: wins,
      losses: losses,
      str:str,
      winText:winText
      

    }
    this.addGuessHandler = this.addGuessHandler.bind(this);
  }

  addGuessHandler(event){
    let copy = Array.from(this.state.pastGuesses);
    let nWrongCopy = this.state.nWrong
    let winsCopy = this.state.wins
    let lossesCopy = this.state.losses
    let copyWinText = this.state.winText
    

    
    //EDGE CASESx
    let alpha = /^[a-z]/i
    if(!isNaN(event.key) || event.key.length !=1 || !alpha.test(event.key) ){
      console.log('please enter a valid single character')
      alert('please enter a valid guess, (a single character, no numbers!)')
      return(null)
    }
    
    
    for(let i = 0; i < copy.length; i++){
			if (copy[i] === event.key.toLowerCase()){
        console.log('already guessed')
        alert('YOU ALREADY GUESSED THAT LETTER!!!!!!!!!!')
        return(null)
      }
    }
    copy.push(event.key.toLowerCase());

    
    //WRONG COUNTER
    let guessMatch=false
    for (let i = 0; i < this.state.answer.length; i++){
      if (event.key.toLowerCase() === this.state.answer[i]){
        guessMatch =  true
      }
     
    }
    if(!guessMatch){
      nWrongCopy = nWrongCopy +1
      console.log(nWrongCopy, "wrong guesses")
    }
    if(nWrongCopy===6){
      lossesCopy = lossesCopy + 1
      // alert('you lost')
      copyWinText = "you lost"
      document.removeEventListener("keypress", this.addGuessHandler)

    }

    //CORRECT ANSWER MATCHED 
    console.log(this.state.answer.length, "answer length")
    console.log(copy.length, "pastGuesses length")

    let letterMatch=0
    for(let i=0; i<this.state.answer.length; i++){
      for(let j=0; j<copy.length; j++){
        if(this.state.answer[i] === copy[j]){
          letterMatch++
        }
        
      }
      
    }
    if(letterMatch>=(this.state.answer.length)){
      console.log('you win');
      winsCopy= winsCopy +1
      // alert('YOU WON')
      copyWinText = "YOU WON!"
      document.removeEventListener("keypress", this.addGuessHandler)

  
    }
    console.log(copy,'end of function past letters')

      // copy.push(event.key.toLowerCase());
   
      this.setState({
        pastGuesses: copy,
        nWrong:nWrongCopy,
        currentKey: event.key,
        losses: lossesCopy,
        wins: winsCopy,
        winText: copyWinText
      
      });
      console.log(copy)
      console.log(event)
  
  }
//SETTING UP A GAME
  getRandomWord(){
    const index = Math.floor(Math.random()*words.length);
    return words[index];
  }

  setUpGame=()=>{
    

    this.setState({
      answer: this.getRandomWord().split(''),
      wins: 0,
      losses:0,
      nWrong: 0,
      pastGuesses:[],
      winText: ""
    })
  }


  buildWordInProgress(answer, pastGuesses){
    let str =""

    for(let i=0; i<answer.length; i++){
      let found = false;
      for(let j=0; j<pastGuesses.length; j++){
        if(answer[i]===pastGuesses[j]){
          found = true;
        }
      }
      if(found){
        str += answer[i];
        str += "\t";
      }
      else{
        str += "_\t";
      }
    }
    return (str)
  }

  setUpNewGame=()=>{
    
    document.addEventListener("keypress", this.addGuessHandler);
    this.setState({
      answer: this.getRandomWord().split(''),
      nWrong: 0,
      pastGuesses:[],
      winText: ""
      
    })
  }

 

  componentWillMount(){
    document.addEventListener("keypress", this.addGuessHandler);

    this.getRandomWord()
    

    this.setUpGame()
    


  }
  



  render() {
    let guess = this.buildWordInProgress(this.state.answer, this.state.pastGuesses)

    
    return (
      <div  tabIndex="0" className="App">
        <div className="navBar">
          <h1>SNOWMAN</h1>
        </div>
        {/* <Snowman pastGuesses={this.state.pastGuesses} answer={this.state.answer} nWrong={this.state.nWrong} currentKey={this.state.currentKey} buildWordInProgress={guess} wins={this.state.wins} losses={this.state.losses}/> */}
        <Router>
          <div>
            <nav>
              <Link to="/highscores">Highscores</Link>
              <Link to="/instructions">Instructions</Link>
              <Link to="/">Snowman</Link>
            </nav>
            {/* <button onClick={this.setUpNewGame}>New game</button> */}
            <Switch>
                <Route path="/instructions" exact component={Instructions}/>
                <Route path='/highscores' render={(props) => (
                  <Highscores  wins={this.state.wins} losses={this.state.losses}/>
                )}/>
                <Route path='/' render={(props) => (
                  <Snowman  pastGuesses={this.state.pastGuesses} answer={this.state.answer} nWrong={this.state.nWrong} currentKey={this.state.currentKey} buildWordInProgress={guess} wins={this.state.wins} losses={this.state.losses} winText={this.state.winText} newGame={this.setUpNewGame}/>
                )}/>

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

{/* <h2>Highscores</h2>
<button><Link to="/highscores">Highscores</Link></button> 
<Route path="/highscores" component={Highscores}/> */}