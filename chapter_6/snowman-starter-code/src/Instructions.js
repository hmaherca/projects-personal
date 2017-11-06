import React from 'react'
import {Link} from 'react-router-dom'

class Instructions extends React.Component{
    render(){
        return(
            <div className="text-centre"> 
               <p>Hangman is a  guessing game . Wiht Magic a word will generate when you load the page or press New Game, as the player you try to guess it by suggesting letters number of guesses(6).</p>
               <h1>AS SOON AS THE PAGE LOADS WHATEVER CHARACTER YOU PRESS WILL BE YOUR GUESS! NO CONFIRMATIONS!</h1>
             </div>
        )
    }
}

export default Instructions