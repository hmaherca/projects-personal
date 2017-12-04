import React, { Component } from 'react';

class Button extends Component{
  
    render(){
        let empty = false;
        if(this.props.todoList.length===0){
            empty = true
        }
        return(
            
            <button disabled={empty} onClick={()=>{console.log(this); this.props.clearHandler(this.props.index)}}  className="pull-right btn btn-default">Clear Complete</button>
        )
    }
}

export default Button