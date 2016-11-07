import React from 'react';
import './App.css';
import axios from 'axios';

/*
	The main differences on the client-side app are in the component lifecycle methods of the TodoApp.
	For this assignment, instead of saving the state to localStorage, the data will now live on the server.
*/

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
			todos:[],
			newText:"",
			filter:"",
			test:""
		}
		this.toggleTodo = this.toggleTodo.bind(this);
		this.changeFilter = this.changeFilter.bind(this);
		this.clearComplete = this.clearComplete.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}
	componentWillMount(){
		//Whenever the component will mount, make a request to the api server for the todos data
		axios.get('http://localhost:8081/todos')
			.then(res => {
				//when the response comes back from the server, set the state of todos to the todos list from the server
				console.log(res.data)
				this.setState({todos:res.data})
			})
	}
	componentWillUpdate(){
		//Whenever an update is triggered in the component, send an update to the server with the newest state of todos
		//Since updates happen whenever the state of this component is changed, 
		//this will update the server whenever any changes are made to the todos array by the user
		axios.post('http://localhost:8081/update',this.state.todos);
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
			this.setState({todos:__todos, newText:""},() => {
				axios.post('http://localhost:8081/update',this.state.todos);
			})
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
			    <h1 className="text-center">Todos</h1>
				<h3>{this.state.test}</h3>
				<TodoForm handleSubmit={this.addTodo} handleTextChange={this.handleTextChange} text={this.state.newText} />
				
				<ul className="list-group">
					{todos}
				</ul>
				
				<select onChange={this.changeFilter}>
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