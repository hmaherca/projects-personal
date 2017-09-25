import React, { Component } from 'react'
import './App.css'


class Hangman extends Component {

    render() {
        return (
            <div>
                <div className='hangmanContainer'>
                    <div className='base'></div>
                    <div className='post'></div>
                    <div className='bar'></div>
                    <div className='rope'></div>
                    <div className='head'></div>
                    <div className='body'></div>
                    <div className='leftArm'></div>
                    <div className='rightArm'></div>
                    <div className='leftLeg'></div>
                    <div className='rightLeg'></div>
                </div>
                <div className='gameContainer'>
                    <h1>Currently Selected Guess is:</h1>
                    <h1>Your word is:</h1>
                    <h2>Your current guesses are:</h2>
                </div>
            </div>
        )
    }
}

export default Hangman