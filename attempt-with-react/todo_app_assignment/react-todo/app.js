class App extends React.Component{
	constructor(){
		super();
		this.state = {
			todos:[
	            {text: 'learn angular', done: false, id: 1},
	            {text: 'write the content for the next module', done: false, id: 2},
	            {text: 'buy cheese', done: true, id: 3},
	            {text: 'buy milk', done: true, id: 4}
	        ]
		}
	}
	render(){
		return(
			<div className="container">
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));