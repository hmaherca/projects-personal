import React, {Component} from 'react'

// class ListItems extends Component{
//     render(){
//         let todoJSX = this.props.todos.map((individualTodo, index)=>{
//             return(
//                 <ul class="list-group">
//                     <li key={individualTodo.id} class="list-group-item">
//                         <input type="checkbox" value="on" />
//                         <label>{individualTodo.text}</label>
//                     </li>
//                 </ul>
//             )
//         })
//         return (
//             {todoJSX}
//         )
//     }
// }

// export default ListItems

class ListItems extends Component{
    // constructor() {
    //     super();
    //     this.changeHandler = this.changeHandler.bind(this);
    // }

    // changeHandler() {
    //     this.props.checkHandler(this.props.eachTodo.id)
    // }

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


// ()=>{ this.props.checkHandler(this.props.eachTodo.id)}