/* List of image urls ------------------------------
'http://imgur.com/9itd49u.png'
'http://imgur.com/n19BXfZ.png'
'http://imgur.com/VBwQmzA.png'
'http://imgur.com/nawDxVv.png'
-------------------------------------------------- */

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>Calvin Carousel</h1>
			    <div>
			    	<button onClick>Previous</button>
			      	<span>1 of 4</span>
			      	<button onClick>Next</button>
			    </div>
				<div>
					<img src="http://imgur.com/9itd49u.png" />
				</div>
			</div>			
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));