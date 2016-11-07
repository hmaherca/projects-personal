import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';

class Login extends Component {
  constructor(){
    super();
    this.state = {username:null,password:null,warning:'no-warning'};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    //This self=this trick is used to store the 'this' of formSubmit inside the self variable.
    //This lets you easily reference the 'this' of formSubmit inside any nested functions.
    let self = this;
    e.preventDefault();

    /*
      Here we send a post request with our state, which contains the username and password.
      If we receive a success status code in our response, we know that an authToken will be sent in the response (because we've done that on the server side)
      We save the authToken in localStorage (so that we can access it on the other routes or if the user refreshes)
      Then, we redirect to the private page.
      If we receive an error at any point, we set the state of warning to a blank string, which will display the warning message.
    */
    axios
      .post('http://localhost:3005/login',this.state)
      .then((res) =>{
          console.log(res);
          if(res.status === 200){
            localStorage.authToken = res.data.token;
            location.href ="http://localhost:3000/private";
            self.setState({
              warning:'no-warning'
            })
          }
          else{
            self.setState({
              warning:''
            })
          }
      })
      .catch(()=>{
          self.setState({
            warning:''
          })
      })
  }

  //Note that we're using the name properties of the inputs to check whether the username or the password input is being changed
  txtFieldChange(e){
    if(e.target.name === "username"){
      this.setState({
        username:e.target.value
      })
    }
    else if(e.target.name === "password"){
      this.setState({
        password:e.target.value
      });
    }
  }

  render() {
    return (
      <div id="auth">
        <h3>Login Form</h3>
        <p className={"alert alert-danger "+ this.state.warning}>Incorrect username or password</p>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

class PrivatePage extends Component{
  constructor(){
    super();
    this.state = {data:null,loading:true, auth:false}
  }
  componentDidMount(){
    const self = this;
    //First, check if an authToken exists in localStorage, if not, then send the user back to the login page
    if(localStorage.authToken === undefined || localStorage.authToken === null){
      location.href = 'http://localhost:3000';
    } else {
      //If there is an authToken available, construct a 'config' object for the request, 
      //and include the authToken in the 'authorization' header of the request.
      let requestConfig = {
        headers:{'authorization':localStorage.authToken}
      }
      //We then send a GET request to our 'privatedata' endpoint, with our config object included.
      //The config object is an optional argument, it is not necessary for all requests.
      //For POST requests, the config object would be the THIRD argument, since the posted data goes second.
      axios
        .get('http://localhost:3005/privatedata',requestConfig)
        .then( (res) => {
            console.log(res);
            if(res.status === 200){
              //If the response from the server has a success status code,
              //We update our state with the server's data and tell our component to stop showing the loading screen
              self.setState({
                loading:false,
                auth:true,
                data:res.data
              });
            }
        });
    }
  }

  /*
    Since this compnent requires a request to a server to get the content of the page,
    we include an alternate render option that shows a loading page, 
    so that a user won't just see a blank screen while your component gets the data from your server
  */
  render(){
    if (this.state.loading) {
      return <div>loading ...</div>;
    }
    else {
      return (
        <div>
          <h1>Private Page Data</h1>
          <h3>Hello, {this.state.data.username}.</h3>
        </div>
        );
    }
  }
}
class Register extends Component {
  constructor(){
    super();
    this.state = {username:null,password:null};

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e){
    e.preventDefault();
    axios
      .post('http://localhost:3005/encrypt',this.state)
      .then( (res) =>{
        console.log(res);
      })
  }

  txtFieldChange(e){
    if(e.target.name === "username"){
      this.setState({
        username:e.target.value
      })
    }
    else if(e.target.name === "password"){
      this.setState({
        password:e.target.value
      });
    }
  }

  render() {
    return (
      <div id="auth">
        <h3>Registration Form</h3>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="text" 
              placeholder="Username" 
              name="username" />
          </div>
          <div className="form-group">
            <input 
              onChange={this.txtFieldChange}
              className="form-control"
              type="password" 
              placeholder="Password" 
              name="password" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

class App extends Component {
   render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
                {this.props.children}               
            </div>
        )
    }
}

export {App,Register,Login,PrivatePage};
