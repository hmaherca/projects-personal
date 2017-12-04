import React, {Component} from 'react'



class ListItems extends Component{
  

    render(){
        console.log(this.props.eachTodo);
        return(
                <li key={this.props.eachTodo.id} className="list-group-item">
                    <input onClick={()=>{ this.props.checkHandler(this.props.eachTodo.id)}} type="checkbox" />
                    <label className={(this.props.eachTodo.done)?"done":""}>{this.props.eachTodo.text}</label>
                </li>

        )

    }
}

export default ListItems


