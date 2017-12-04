const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {type:String},
    done:{type:Boolean}
})

const TodoModel = mongoose.model('Todo', todoSchema)

module.exports=TodoModel; 