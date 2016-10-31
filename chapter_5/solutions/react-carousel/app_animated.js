var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//list of image urls in array form
const urls = [
	'http://imgur.com/9itd49u.png',
	'http://imgur.com/n19BXfZ.png',
	'http://imgur.com/VBwQmzA.png',
	'http://imgur.com/nawDxVv.png'
]

class App extends React.Component {
	constructor(){
		super();
		//set initial state of App
		this.state = {
			index:0
		}
		console.log('animated')
		//binding 'this' to the changeImage method, this is necessary when using ES6 classes in React
		this.changeImage = this.changeImage.bind(this);
	}
	changeImage(num){
		//using modulus(%) to handle images looping back around
		this.setState({index:(this.state.index + num + 4) % 4});
	}
	render(){
		//setting the image to whichever one is defined by the component's state
		const imageSrc = this.props.imageUrls[this.state.index];

		// uses the imageUrls array to create an array of img elements
		const images = this.props.imageUrls.filter((url,index) => index === this.state.index).map((url, index) => {
			//if the index of the img element matches the index in the state, unhide.
			//All other images are hidden by default
			return <img key={index} src={url} />
		})
		return(
			<div>
				<h1>Calvin Carousel</h1>
			    <div>
					{/* Here we use an anonymous arrow function so that we can call the changeImage function with different
						arguments depending on which button was clicked. 
						Another option is to have different functions for going forward and back in the carousel.
						We also use ternary operators (?) to handle disabling the button, these act as shorthand for simple if conditionals
					*/}
			    	<button onClick={() => this.changeImage(-1)} disabled={this.state.index === 0 ? true : false}>Previous</button>
			      	<span>{this.state.index + 1} of 4</span>
			      	<button onClick={() => this.changeImage(1)} disabled={this.state.index === this.props.imageUrls.length - 1 ? true : false}>Next</button>
			    </div>
				<div>
					{/* We're using ReactCSSTransitionGroup to trigger our animations, it's an addon for React provided by Facebook. 
						It detects changes in the elements within the group, and adds the appropriate animation classes to the elements
						 being added/removed when those changes are detected.  
					*/}
					<ReactCSSTransitionGroup
						transitionName="carousel"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}>
						<img src={imageSrc} key={imageSrc}/>
					</ReactCSSTransitionGroup>
				</div>
			</div>
		)
	}
}

//Providing the array of urls as a prop to the App component
ReactDOM.render(<App imageUrls={urls} />, document.getElementById('app'));