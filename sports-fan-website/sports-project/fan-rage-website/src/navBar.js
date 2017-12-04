import React, { Component } from 'react'
import { Button, Icon, Navbar, NavItem } from 'react-materialize';

class NavBar extends Component {
  render() {
    return (
      <Navbar className="navbar-hisham" brand='FAN RAGE' right>
        { /* <NavItem href='get-started.html'>
                                                                          <Icon>search</Icon>
                                                                        </NavItem>
                                                                        <NavItem href='get-started.html'>
                                                                          <Icon>view_module</Icon>
                                                                        </NavItem>
                                                                        <NavItem href='get-started.html'>
                                                                          <Icon>refresh</Icon>
                                                                        </NavItem>
                                                                        <NavItem href='get-started.html'>
                                                                          <Icon>more_vert</Icon>
                                                                        </NavItem> */ }
      </Navbar>
    )
  }
}

export default NavBar;