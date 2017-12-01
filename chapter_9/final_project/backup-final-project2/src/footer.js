import React, { Component } from 'react'
import { Button, Icon, Navbar, NavItem, Footer } from 'react-materialize';

class Footers extends Component {
    render() {
        return (
            <Footer links={ <ul>
                  { /* <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li> */ }
                </ul> } className='example'>
              <h5 className="white-text"></h5>
              <p className="grey-text text-lighten-4 textCenter">EXPERIENCE THE BANTER</p>
            </Footer>
        )
    }
}

export default Footers;

// style={ { backgroundImage: "url('Images/footerImage.jpg')" } }



<Footer moreLinks={ <a className="grey-text text-lighten-4 right" href="#!">More Links</a> } links={ <ul>
                                                                                                       <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
                                                                                                     </ul> } className='example'>
  <h5 className="white-text">Footer Content</h5>
  <p className="grey-text text-lighten-4 textCenter">You can use rows and columns here to organize your footer content.</p>
</Footer>
