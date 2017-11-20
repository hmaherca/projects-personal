const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const Todo = require('./models/Todos.js')
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/data/db'

mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;

//when an open event fires I want you to alert the developer
connection.on("open", () => {
    console.log('we are listening to the database27017 mongo')
    app.listen(PORT, () => {
        console.log('we are listening to', PORT)
    })
})


//Create a Todo

// const french = new Todo({
//     text:'Learn FRENCH',
//     done:'false',
// })
// .save()
// .then(savedTodo =>{
//     console.log(savedTodo)
// })
// .catch(error =>{
//     console.log(error)
// })



app.post('/todos', (req, res) => {
    console.log(req.body, "this is the post body")
    // CREATE A NEW DOCUMENT IN THE 'TODO' Collection
    // call the model like a constructor to make one instance
    //of that type
    // console.log(req.body)
    Todo({
        text: req.body.text,
        done: false,

    })
        .save()
        .then(savedTodo => {
            console.log('savedTodo: ' + savedTodo)
            // res.send("you added a Todo!")
            res.json(savedTodo)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('we encountered an error on the server')
        })
})




app.get('/todos', (req, res) => {
    Todo.find({})
        .then(todo => {
            console.log(todo)
            res.json(todo)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send('not found ')
        })

})

//create a PUT route, for the path /updatetodo
app.put('/updatetodo', (req, res) => {
    Todo.findByIdAndUpdate({
        _id: req.body.data._id
    }, {
        done: !req.body.data.done
    })
        .then(oldTodo => {
            res.json({
                done: !req.body.data.done
            })
        })
        .catch(error => {
            console.log(error)
        })

})

app.delete('/deletetodos', (req, res) => {
    Todo.remove({
        _id: {
            $in: req.body
        }
    })
        .then(deletedTodo => {
            console.log(deletedTodo)
        })
        .catch(error => {
            console.log(error, "deletee error server side")
        })
    Todo.find({})
        .then(data => {
            console.log(data, "this is the updated database")
            res.json(data)
        })
        .catch(error => {

        })
})

