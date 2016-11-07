import React from 'react';
import './App.css';

// This file is almost the same as the one from the TodoApp assignment, except for adding the ability to save the state to LocalStorage.
// Check the TodoApp component for the new code.

class ListItem extends React.Component {
	render() {
		return (
			<li className="list-group-item">
				<input type="checkbox" checked={this.props.done} onChange={this.props.toggle} id={this.props.id}/>
				<label className={this.props.done ? "done" : ""}>{this.props.text}</label>
			</li>
		)
	}
}

class TodoForm extends React.Component {
	render(){
		return (
			<form onSubmit={this.props.handleSubmit}>
				<div className="input-group">
					<span className="input-group-btn">
						<button className="btn btn-primary" type="submit">Add</button>
					</span>
					<input onChange={this.props.handleTextChange} className="form-control" placeholder="add a todo" value={this.props.text}/>
				</div>
			</form>
		)
	}
}

class TodoApp extends React.Component{
	constructor(){
		super();
		this.state = {
			todos:[
	            {text: 'learn react', done: false, id: 0, active:true},
	            {text: 'write the content for the next module', done: false, id: 1, active:true},
	            {text: 'buy cheese', done: true, id: 2, active:true},
	            {text: 'buy milk', done: true, id: 3, active:true}
	        ],
			newText:"",
			filter:"all"
		}
		this.toggleTodo = this.toggleTodo.bind(this);
		this.changeFilter = this.changeFilter.bind(this);
		this.clearComplete = this.clearComplete.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}
	componentWillMount(){
		//We use componentWillMount, since this will run this snippet of code right before this component tries to load
		//this code checks to see if there is there is a saved state in localStorage.
		//if it is there, it is parsed and the default state is replaced by the saved state.
		if(localStorage.state){
			let savedState = JSON.parse(localStorage.state);
			this.setState(savedState);
		}
	}
	componentWillUnmount(){
		//Whenever the component unmounts, we will stringify the state of this component as JSON and save it in localStorage.state 
		localStorage.state = JSON.stringify(this.state);
	}
	toggleTodo(e){
		let __todos = this.state.todos;
		__todos[e.target.id].done = !(__todos[e.target.id].done);
		this.setState({todos:__todos});
	}
	changeFilter(e){
		this.setState({filter:e.target.value});
	}
	clearComplete(e){
		let __todos = this.state.todos.map((todo) => {
			if(todo.done === true){
				todo.active = false;
			}
			return todo;
		});
		this.setState({todos:__todos})
	}
	handleTextChange(e){
		this.setState({newText:e.target.value})
	}
	addTodo(e){
		e.preventDefault();
		if(this.state.newText !== ""){
			let __todos = this.state.todos;
			__todos.push({text:this.state.newText, done:false, id:this.state.todos.length, active:true})
			this.setState({todos:__todos, newText:""})
		} else {
			alert("This todo is blank!");
		}
	}
	render(){
		const todos = this.state.todos.filter((todo) => {
			return todo.active;
		}).filter((todo) => {
			if(this.state.filter === "active"){
				return !todo.done
			} else if (this.state.filter === "complete"){
				return todo.done
			} else {
				return true;
			}
		}).map((todo,index) => {
			return <ListItem text={todo.text} done={todo.done} id={todo.id} toggle={this.toggleTodo} key={index}/>
		})
		return (
			<div className="container">
			    <h1 className="text-center">todos</h1>

				<TodoForm handleSubmit={this.addTodo} handleTextChange={this.handleTextChange} text={this.state.newText} />
				
				<ul className="list-group">
					{todos}
				</ul>
				
				<select onChange={this.changeFilter} value={this.state.filter}>
					<option value="all">all</option>
					<option value="active">active</option>
					<option value="complete">complete</option>
				</select>
				
				<button onClick={this.clearComplete} className="pull-right btn btn-default">Clear Complete</button>
			</div>
		)
	}
}

export default TodoApp;