//This is a component for each list item in the list of todos
//Each item component has 4 props:
// The todo's text, id, and whether or not the todo is done.
// The 4th prop is a function that handles when a user checks or unchecks the input checkbox
//
//Look carefully at how the onChange handler works. Since we want to provide parameters to the toggle function, we want to write 'onChange={this.props.toggle(this.props.id)}'.
//However, if you try doing this, React will see this as you wanting the call the function immediately rather than calling the function when a change is detected.
//To avoid this problem, we define an anonymous function with an arrow function, and inside the arrow function is where we call our toggleTodo method.
//There are other ways of dealing with this, like doing 'onChange={this.props.toggle.bind(this,this.props.id)}', which essentially does the same thing.
class ListItem extends React.Component {
	render() {
		return (
			<li className="list-group-item">
				<input type="checkbox" checked={this.props.done} onChange={() => { this.props.toggle(this.props.id)}} id={this.props.id}/>
				<label className={this.props.done ? "done" : ""}>{this.props.text}</label>
			</li>
		)
	}
}

//This is a component for the form for adding new todos.
//It has two props: a function for submitting the form and a function for handling changes in the input text
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

//Main component for the TodoApp
//This will be the 'smart' component, this is the only component with state, and will handle the overall state and logic of the app
//The other components will simply be 'dumb' components that just display the given data.
class App extends React.Component {
	constructor(){
		super();
		// setting the initial state of the app
		this.state = {
			todos:[
	            {text: 'learn react', done: false, id: 0, active:true},
	            {text: 'write the content for the next module', done: false, id: 1, active:true},
	            {text: 'buy cheese', done: true, id: 2, active:true},
	            {text: 'buy milk', done: true, id: 3, active:true}
	        ],
			newText:"",
			filter:""
		}
		//Binding 'this' to the various methods of the App Component
		this.toggleTodo = this.toggleTodo.bind(this);
		this.changeFilter = this.changeFilter.bind(this);
		this.clearComplete = this.clearComplete.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.addTodo = this.addTodo.bind(this);
	}
	toggleTodo(index){
		//Whenever a todo is checked/unchecked, reverse the state of that specific todo, using the index provided to this method.
		//Note that React does not allow direct mutation of the state, and you cannot simply push directly to this.state.todos
		//Instead, we create a copy of the todos array in the state, modify the copied array, and then set the new state to use the copied array.
		let __todos = this.state.todos;
		__todos[index].done = !(__todos[index].done);
		this.setState({todos:__todos});
	}
	changeFilter(e){
		//Whenever the user selects a new filter, change the state's filter property to match the selection
		this.setState({filter:e.target.value});
	}
	clearComplete(e){
		//When the user clicks the clear complete button, deactivate all completed todos.
		//We deactivate them instead of removing them from the array completely, just to keep a record of all todos just in case.
		let __todos = this.state.todos.map((todo) => {
			if(todo.done === true){
				todo.active = false;
			}
			return todo;
		});
		this.setState({todos:__todos})
	}
	handleTextChange(e){
		//whenever a user changes the value of the todoForm input, change the state of the App component to track the new text
		this.setState({newText:e.target.value})
	}
	addTodo(e){
		//Since this method is called on a form submit event, we need to prevent the page from refreshing.
		e.preventDefault();
		//If the user submits the form, add the new todo to the list.
		//Note that React does not allow direct mutation of the state, and you cannot simply push directly to this.state.todos
		//Instead, we create a copy of the todos array in the state, modify the copied array, and then set the new state to use the copied array.
		if(this.state.newText !== ""){
			let __todos = this.state.todos;
			__todos.push({text:this.state.newText, done:false, id:this.state.todos.length, active:true})
			this.setState({todos:__todos, newText:""})
		} else {
			alert("This todo is blank!");
		}
	}
	render() {
		//We use filters here to filter out the todos based on what the current filter in the state is.
		//The first filter hides any todos deactivated by the 'Clear Complete button'
		//The second filter hides todos based on the currently selected filter in the state.
		//Then, the resulting filtered array of todos is mapped to create an array of ListItem Components
		const todos = this.state.todos.filter((todo) => {
			return todo.active;
		}).filter((todo) => {
			if(this.state.filter === "active"){
				return !todo.done  // return all the incomplete todos
			} else if (this.state.filter === "complete"){
				return todo.done // return all the complete todos
			} else {
				return true; // return all todos
			}
		}).map((todo,index) => {
			return <ListItem text={todo.text} done={todo.done} id={todo.id} toggle={this.toggleTodo}/>
		})

		//Here we render our TodoApp, including the child components defined earlier
		//Note how we can pass a variety of thing through component props, including data and even functions as props.
		return (
			<div className="container">
			    <h1 className="text-center">todos</h1>

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

ReactDOM.render(<App />, document.getElementById('app'));
