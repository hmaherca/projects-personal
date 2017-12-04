import React, {Component} from 'react'



class ListItems extends Component{
  

    render(){
        console.log('this is supposed to be an id: ' +this.props.individualTodo);
        return(
                <li key={this.props.eachTodo} className="list-group-item">
                    <input onClick={()=>{ this.props.checkHandler(this.props.individualTodo, this.props.index)}} type="checkbox" />
                    <label className={(this.props.individualTodo.done)?"done":""}>{this.props.individualTodo.text}</label>
                </li>

        )

    }
}

export default ListItems


