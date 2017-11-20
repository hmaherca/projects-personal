import React, { Component } from 'react';

class Select extends Component {
    constructor() {
        super();
        this.selectHandler = this.selectHandler.bind(this)
        
    }
    selectHandler(event){
        this.props.selectHandler(event.target.value)
    }
    render() {
        return (
            <select onChange={this.selectHandler}>
                <option value="all">all</option>
                <option value="active">active</option>
                <option value="complete">complete</option>
            </select>
        )
    }
}

export default Select