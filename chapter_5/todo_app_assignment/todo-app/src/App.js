import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import ListItems from './List'
import Title from './Title'
import Select from './Select'
import Button from './Button'
import UL from './UL'

const todos = [
  {text: 'learn angular', done: false, id: 1},
  {text: 'write the content for the next module', done: false, id: 2},
  {text: 'buy cheese', done: false, id: 3},
  {text: 'buy milk', done: false, id: 4},
]


class App extends Component {
  constructor(){
		super();
		this.state = {
    todos: todos,
    show: "all"
    };
    this.checkHandler = this.checkHandler.bind(this);
    this.addTodoHandler = this.addTodoHandler.bind(this);
    this.clearHandler = this.clearHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  checkHandler(id){
    console.log(id);
    let copy = Array.from(this.state.todos).map((individualTodo) => {
        let output = individualTodo;
        if(output.id === id){
          output.done = !output.done;
        }
        return output;
    })

    // console.log(copy);

    // copy[index].done= !copy[index].done;

    this.setState({
      todos: copy
    });
  }

  addTodoHandler(text){
    let copy = Array.from(this.state.todos);

    if (text!== "") {
      copy.unshift(
        {
          text: text,
          done: false,
          id:copy.length+1
        }
      );
   
      this.setState({
        todos: copy
      });
   
      //this._inputElement.value = "";
    }
   
    console.log(copy);
     
   // e.preventDefault();

  }

  clearHandler(){
    // let copy = Array.from(this.state.todos);
    let clearList = 
    this.state.todos.filter((item)=> !item.done)
    
    
    this.setState({
      todos: clearList
    });
  }

  changeHandler(value){
    if(value==="all"){
      this.setState({
        show:"all"
      })
    }
    else if(value==="active"){
      this.setState({
        show:"active"
      })
    }
    else if(value==="complete"){
      this.setState({
        show:"complete"
      })
    }


  }

  
  
  render() {
    
    // const todos = [
    //   {task:'Learn React'},
    //   {task:'complete assignment'},
    //   {task:'sleep'}
    // ]
    // let todoList=[]
    // for(let i=0; i<todos.length; i++){
    //   todoList.push(<ListItems task={todos[i].text}/>)
    // }
    let Todos = [];
    if(this.state.show==="all"){
      Todos=this.state.todos
    }
    else if(this.state.show==="active"){
       Todos= this.state.todos.filter((item)=> !item.done)
    }
    else if(this.state.show==="complete"){
      Todos= this.state.todos.filter((item)=> item.done)
    }

    let todoList = Todos.map((individualTodo, index)=>{
      return (
      <ListItems eachTodo={individualTodo} checkHandler={this.checkHandler} />
      )
    })
    
    
    return (
      
      <div className="container">
        <Title />
        <Form addTodoHandler={this.addTodoHandler} />
        <UL eachTodo = {todoList}  />
        <Select selectHandler={this.changeHandler} />
        <Button clearHandler={this.clearHandler} buttonFreeze={this.buttonFreeze} todoList={this.state.todos}   />
      </div>
    );
  }
}


export default App;
//<button disabled = {true or false}></button>