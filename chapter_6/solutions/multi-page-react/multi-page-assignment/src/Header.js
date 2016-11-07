import React from 'react';
import { Link } from 'react-router';

//This is the header/Navbar for our app. The Link components from react-router are used for navigation within the app.
//Note that since this component will be used on a parent route and will have routes nested within it,
//we have to render this.props.children wherever we want the nested content to display.
class Header extends React.Component {
    render(){
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-default">
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

export default Header;
