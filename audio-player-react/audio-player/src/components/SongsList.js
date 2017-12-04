import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';





class SongsList extends Component {

    
    render() {
        let copy = Array.from(this.props.songs);
        let songJSX = copy.map((song, index)=>{
            return(
                <div>
                    <Link to={"/"+song.id}>{song.title}</Link>
                    <p> Title: {song.title}</p>
                    <p> Source: {song.source}</p>
                    {/* <audio  src={song.source} type="mp3" controls="controls"/> */}
                 
                    <button onClick={()=>{this.props.onclick(song.id)}} id ="the button">Play</button>
                   
                </div>  
            )
        })

        console.log(this.props)
        return (
            <div>
                <h1>This is the Song List Page</h1>
                {songJSX}
            </div>
        )
    }
}

export default SongsList;