const cards = [{
    imgSrc: 'images/square1.jpg',
    title: 'Card 1'
}, {
    imgSrc: 'images/square2.jpg',
    title: 'Card 2'
}, {
    imgSrc: 'images/square3.jpg',
    title: 'Card 3'
}, {
    imgSrc: 'images/square4.jpg',
    title: 'Card 4'
}, {
    imgSrc: 'images/square5.jpg',
    title: 'Card 5'
}, {
    imgSrc: 'images/square6.jpg',
    title: 'Card 6'
}]

class App extends React.Component {
    render() {
        //using the Array.map() method to create an array of Card components using the cards array
        //this array of Card components is then placed into the row as a whole
        const cardComponents = this.props.cards.map((card,index) => {
            //Each Card component is given the appropriate title and image
            return <Card title={card.title} image={card.imgSrc}/>
        });
        return(
        <div className="container">
            <h1>BrainStaGram</h1>
            <div className="row">
                {cardComponents}
            </div>
        </div>
        )
    }
}

class Card extends React.Component {
    render() {
        //Simple Card component, using the markup from markup.html and adding in the ability to show the 
        // title and image props given to the Card.
        return(
        <div className="col s4">
            <div className="card">
                <div className="card-image">
                    <img src={this.props.image} />
                    <span className="card-title">{this.props.title}</span>
                </div>
                <div className="card-content">
                    <p>Powering the next generation of creators. Build your skills in business, design &amp; technology.</p>
                </div>
            </div>
        </div>
        )
    }
}

//Here we provide the cards array as a prop to the App component
ReactDOM.render(<App cards={cards} />, document.getElementById('app'))