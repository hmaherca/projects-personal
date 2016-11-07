import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
    render(){
        return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/">Todos</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="page-header text-center">
                <h1>Multi-page Assignment</h1>
            </div>
            {this.props.children}
        </div>
        )
    }
}

export default App;
