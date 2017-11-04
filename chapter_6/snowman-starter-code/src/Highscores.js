import React from 'react'
import {Link} from 'react-router-dom'

class Highscores extends React.Component{
    render(){
        return(
            <div>
                 
                <h1> your wins are {this.props.wins}</h1>
                <h1> Your total Losses {this.props.losses}</h1>
            </div>
        )
    }
}

export default Highscores