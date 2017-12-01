import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import axios from 'axios'
import Soccergames from './Soccergames'
import Tweets from './tweet.js'
import NavBar from './navBar.js'
import Footer from './footer.js'
import { Button, Icon, Navbar } from 'react-materialize';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imagePath: '',
      currentTweet: '',
      userName: '',
      userImage: '',
      userLocation: '',
      emotion: 'none',
    };
    this.apiRequests = this.apiRequests.bind(this);
    this.apiCaller = this.apiCaller.bind(this);
  // this.emotionPic = this.emotionPic.bind(this)
  }

  apiCaller() {
    setInterval(this.apiRequests, 6000)
  //console.log(this.apiRequests)
  }



  apiRequests() {
    axios.get('http://localhost:8080/chelsea')
      .then(result => {
        console.log(result.data)
        let currentTweet = result.data.tweetText
        let userTweet = result.data.nameTweet
        let userImage = result.data.userImage
        let userLocation = result.data.userLocation
        console.log(currentTweet, "This is the currentTweet")
        console.log(userTweet, 'this is the USERNAME')
        console.log(userImage, 'userimage path')
        console.log(result.data.userLocation, 'users location')
        this.setState({
          userName: userTweet,
          currentTweet: currentTweet,
          userImage: userImage,
          userLocation: userLocation

        })
        //GET request to IBM-WATSON API
        let insert = currentTweet;
        console.log(insert);
        axios.get('http://localhost:8080/soccer/' + insert)
          .then(result => {
            console.log(result.data.tones, "this is the result from tone analyser")
            let tones = result.data.tones
            //going to loop through the tone array
            //it is an array of objects and we are going to access the score
            //default we are going to set max to the first tone score and compare the array with it
            // if we find a higher value we will set max to that value
            let max = tones[0];
            for (let i = 0; i < tones.length; i++) {
              if (tones[i].score > max.score && tones[i].score !== 0) {
                max = tones[i]
              }

            }
            if (max.score === 0) {
              max.tone_name = 'none'
            }
            // console.log(max)
            console.log(max.tone_name)
            let path;
            if (max.tone_name === 'Angry') {
              path = '/Images/angryFace.jpg'
            }
            if (max.tone_name === 'Disgust') {
              path = '/Images/disgustedFace.png'
            }
            if (max.tone_name === 'Joy') {
              path = '/Images/happyFace.jpeg'
            }
            if (max.tone_name === 'Sadness') {
              path = '/Images/sadFace.jpg'
            }
            if (max.tone_name === 'none') {
              path = '/Images/noneFace.jpg'
            }
            this.setState({
              emotion: max.tone_name,
              imagePath: path
            })
          })
          // x is just a placeholder because the previous promise did not return anything
          .then(x => {
            this.emotionPic();
          })
          .catch(error => {
            console.log(error)
          })


      })
      .catch(error => {
        console.log(error)
      })
  }

  // emotionPic() {
  //   let path;
  //   if (this.state.emotion === 'Angry') {
  //     path = '/Images/angryFace.jpg'
  //   }
  //   if (this.state.emotion === 'Disgust') {
  //     path = '/Images/disgustFace.jpg'
  //   }
  //   if (this.state.emotion === 'Joy') {
  //     path = '/Images/happyFace.jpg'
  //   }
  //   if (this.state.emotion === 'Sadness') {
  //     path = '/Images/sadFace.jpg'
  //   }
  //   this.setState({
  //     imagePath: path
  //   })
  // }

  // componentDidMount() {
  //   this.emotionPic()
  // }

  componentWillMount() {
    this.apiRequests()
    this.apiCaller()
  }

  render() {

    return (
      <div className="App">
        <div className="row">
          <NavBar/>
          <Soccergames />
          <Tweets username={ this.state.userName } currentTweet={ this.state.currentTweet } userImage={ this.state.userImage } tweetLocation={ this.state.userLocation } emotion={ this.state.emotion }
            imagePath={ this.state.imagePath } />
          <Footer/>
        </div>
      </div>
      );
  }
}

export default App;
