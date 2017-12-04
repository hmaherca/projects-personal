import React, { Component } from 'react'

class Tweets extends Component {

    render() {


        return (
            <div className="col-md-6 col-sm-12">
              <div>
                <div className="card" style={ { height: '62vh' } }>
                  <img className="card-img-top imgTwitter" src={ this.props.userImage } alt="Card image cap" />
                  <div className="card-body">
                    <h4 className="card-title">Username:{ this.props.username }</h4>
                    <h4 className="card-title">Tweeting From:{ this.props.tweetLocation }</h4>
                    <p className="card-text">
                      { this.props.currentTweet }
                    </p>
                    <p>
                      { this.props.username } emotion is :
                      { this.props.emotion }
                    </p>
                    <img className="card-img-top emotions" src={ this.props.imagePath } alt="Card image cap" />
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Tweets