import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css'
import Form from './Form'
import Highscores from './Highscores'





class Snowman extends Component {
    

    render() {
        
        return (
            <div>
                <div className='hangmanContainer'>
                    <div hidden={this.props.nWrong>0} className="hat">
                        <div className="hat__brim"></div>
                    </div>
                    <div hidden={this.props.nWrong>1} className='head'>
                        <div className="head__eye head__eye--left"></div>
                        <div className="head__eye head__eye--right"></div>    
                        <div className="head__nose"></div>
                    </div> 
                    <div hidden={this.props.nWrong>0}className="hat"></div>
                    <div hidden={this.props.nWrong>2} className='body--top'>
                        <div className="body__button body__button--top"></div>
                        <div className="body__button body__button--middle"></div>
                        <div className="body__button body__button--bottom"></div>
                    </div>
                    <div hidden={this.props.nWrong>3} className="body--bottom">

                    </div> 
                    
                    <div  hidden={this.props.nWrong>4}className='leftArm'></div>
                    <div hidden={this.props.nWrong>5} className='rightArm'></div>
                </div>
                <div className='gameContainer'>
                    <Form />
                    <h1>Currently Selected Guess is:{this.props.currentKey}</h1>
                    <h1>Your word is:{this.props.buildWordInProgress}</h1>
                    <h2>Your past guesses are:{this.props.pastGuesses}</h2>
                    <h2>the answer is: {this.props.answer}</h2>
                    <h2>Wins: {this.props.wins} Losses:{this.props.losses}</h2>
              
                </div>
            </div>
        )
    }
}

export default Snowman