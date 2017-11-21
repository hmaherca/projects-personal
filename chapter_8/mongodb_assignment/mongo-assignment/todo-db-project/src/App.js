import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import ListItems from './List';
import Title from './Title';
import Select from './Select';
import Button from './Button';
import UL from './UL';
import axios from 'axios';

const todos = [
  // {text: 'learn angular', done: false, id: 1},
  // {text: 'write the content for the next module', done: false, id: 2},
  // {text: 'buy cheese', done: false, id: 3},
  // {text: 'buy milk', done: false, id: 4},
]


class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      show: "all"
    };
    this.checkHandler = this.checkHandler.bind(this);
    this.addTodoHandler = this.addTodoHandler.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  checkHandler(individualTodo, index) {
    console.log(individualTodo, "the indi todo")
    axios.put('http://localhost:8080/updatetodo', {
      data: individualTodo
    })
      .then(res => {
        console.log(res, "this is the result from the checkhandler")
        let copy = Array.from(this.state.todos)
        copy[index].done = res.data.done
        this.setState({
          todos: copy
        })
      })
  }

  addTodoHandler(text) {
    axios.post('http://localhost:8080/todos', {
      text: text
    })
      .then(result => {
        console.log(result)
        let copy = Array.from(this.state.todos);
        copy.unshift(result.data);
        this.setState({
          todos: copy
        });
      })
      .catch(error => {
        console.log(error, "add todo error")
      })
  }

  clearHandler() {
    let copy = Array.from(this.state.todos);
    let newCopy = copy.filter((element, index) => {
      return element.done

    })
    let removeIds = newCopy.map((element, index) => {
      return element._id
    })
    axios.delete('http://localhost:8080/deletetodos', {
      data: removeIds
    }).then(res => {
      this.setState({
        todos: res.data
      })
    })
  }

  changeHandler(value) {
    if (value === "all") {
      this.setState({
        show: "all"
      })
    } else if (value === "active") {
      this.setState({
        show: "active"
      })
    } else if (value === "complete") {
      this.setState({
        show: "complete"
      })
    }


  }

  componentWillMount() {
    axios.get('http://localhost:8080/todos')
      .then(result => {
        console.log(result.data)
        let allTodos = result.data
        console.log(allTodos, "ToDos from WillMount")
        this.setState({
          todos: allTodos

        })
      })
      .catch(error => {
        console.log(error)
      })
  }



  render() {

    let Todos = [];
    if (this.state.show === "all") {
      Todos = this.state.todos
    } else if (this.state.show === "active") {
      Todos = this.state.todos.filter((item) => !item.done)
    } else if (this.state.show === "complete") {
      Todos = this.state.todos.filter((item) => item.done)
    }

    let todoList = Todos.map((individualTodo, index) => {
      return (
        <ListItems key={ individualTodo._id } index={ index } _id={ individualTodo._id } checkHandler={ this.checkHandler } text={ individualTodo.text } done={ individualTodo }
          individualTodo={ individualTodo } />
      )
    })


    return (

      <div className="container">
        <Title />
        <Form addTodoHandler={ this.addTodoHandler } />
        <UL eachTodo={ todoList } />
        <Select selectHandler={ this.changeHandler } />
        <Button clearHandler={ this.clearHandler } buttonFreeze={ this.buttonFreeze } todoList={ this.state.todos } />
      </div>
      );
  }
}


export default App;
