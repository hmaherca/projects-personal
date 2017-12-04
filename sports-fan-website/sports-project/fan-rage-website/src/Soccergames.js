import React, { Component } from 'react'
import Tweets from './tweet.js'


class Soccergames extends Component {
    render() {
        return (
            <div className="col-md-6 col-sm-12 scores">
              <div className="">
                <iframe src="https://scorestream.com/widgets/scoreboards/vert?userWidgetId=20594" className="iframe-scores" style={ { padding: '0px', border: '3px solid', width: '100%', height: '78vh', maxHeight: '615px', margin: ".5rem 0 1rem 0" } } title="Realtime sports scoreboard widget"
                  scrolling="no" frameBorder="0"></iframe>
              </div>
              { /* <Tweets /> */ }
            </div>
        )
    }

}

export default Soccergames