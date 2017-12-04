import React, { Component } from 'react';

class Form extends Component {
    method=(e)=>{
        e.preventDefault();
        
        this.props.addTodoHandler(this._inputElement.value)
    }
    render(){
        return(
        <form onSubmit={this.method}>
            <div className="input-group">
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit">Add</button>
                </span>
                <input ref={(a) => this._inputElement = a} className="form-control" placeholder="add a todo" required />
            </div>
        </form>
        )
    }
}

export default Form;