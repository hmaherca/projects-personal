import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp';
import About from './About';
import App from './App';
import './index.css';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <IndexRoute component={TodoApp} />
      <Route path="/about" component={About} />
    </Route>
  </Router>
), document.getElementById('root'))

