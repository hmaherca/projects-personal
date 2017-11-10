import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

class Player extends Component {
    render(){
        return(
            <div>
                 <audio  src={this.props.songs[this.props.source].source} type="mp3" controls="controls"/>
            </div>
        )
    }
}

export default Player