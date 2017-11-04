import React, { Component } from 'react';

class Form extends Component{
    method=(event)=>{
        event.preventDefault();
        
        
    }
    render(){
        return(
        <form onSubmit={this.method} >
            <div className="input-group">
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit">GUESS</button>
                </span>
                <input ref={(a) => this._inputElement = a} className="form-control" placeholder="Enter A Guess" required />
            </div>
        </form>
        )
    }
}

export default Form