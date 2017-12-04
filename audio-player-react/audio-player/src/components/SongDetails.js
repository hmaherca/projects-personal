import React, {Component} from 'react';
// import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Player from './Player'

class SongDetails extends Component {
    render() {
            let songId = this.props.match.params.songId
            return(
                <div>
                    <p>Song ID: {this.props.match.params.songId}</p>
                    <p>Song Title :{this.props.songs[songId].title}</p>
                    <p>Song Description: {this.props.songs[songId].description}</p>
                    {/* <Player songs={this.props.songs} source={this.props.source}/> */}
                </div>  
                
            )
        }
    }

export default SongDetails;