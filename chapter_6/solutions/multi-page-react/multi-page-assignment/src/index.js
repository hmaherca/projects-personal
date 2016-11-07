import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import About from './About';
import Header from './Header';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

/*
  Header will be the component used for the parent route, which displays the navbar with the links to the child pages
  IndexRoute is used for the TodoApp component, this means that the TodoApp will be shown if the path matches the parent exactly, or if the path doesn't match any of the other routes.
*/
ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={Header} >
      <IndexRoute component={TodoApp} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'))

