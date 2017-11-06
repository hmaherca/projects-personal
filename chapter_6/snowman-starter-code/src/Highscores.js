import React from 'react'
import {Link} from 'react-router-dom'
import App from './App'

class Highscores extends React.Component{
    render(){
        let copy = Array.from(this.props.pastGames);
        let gameJSX = copy.map((games, index)=>{
            return(
                <div>
                   
                    <h2> Won Or lost?: {games.winState}</h2>
                    <h2> Wrong Guesses: {this.props.nWrong}</h2>
                    <h2> Word Was: {games.answer}</h2>
                    <hr></hr>
                </div>  
                
            )
        })
        return(
            <div>
                 
                <h1> your wins are {this.props.wins}</h1>
                <h1> Your total Losses {this.props.losses}</h1>
                <h1>Detailed Game History</h1>
                {gameJSX}
            </div>
        )
    }
}

export default Highscores