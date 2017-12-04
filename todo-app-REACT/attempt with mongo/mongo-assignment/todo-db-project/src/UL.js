import React, { Component } from 'react'
import ListItems from './List'

class UL extends Component {
    render(){
        console.log( this.props.eachTodo)
        return(
            <ul className="list-group">
                {this.props.eachTodo}
            </ul>
        )
    }
}

export default UL

