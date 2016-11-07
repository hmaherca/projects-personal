const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 8081;

//Initialize todo data if first time server is running.
let todos = [
    {text: 'learn react', done: false, id: 0, active:true},
    {text: 'write the content for the next module', done: false, id: 1, active:true},
    {text: 'buy cheese', done: true, id: 2, active:true},
    {text: 'buy milk', done: true, id: 3, active:true}
]

//When the server starts up, it tries to find and read a todos.txt 
fs.readFile('todos.txt', 'utf8', (err, data) => {
    if(err){
        console.log(err);
    } else {
        //If no errors, replace todos array with the data read from the file
        todos = JSON.parse(data);
    }
});

//Setting up body parser to handle data in json or encoded url form
//body-parser will parse any data sent in post requests to your server, and attach that data to the body property of the request (req.body)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Setting up your server to accept requests from any origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Get endpoint that sends the todo list to the client
app.get('/todos',(req,res) => {
    res.send(todos)
})

//POST endpoint that accepts a new todo array from the client and updates the server's array 
//and writes a backup to a todos.txt file
app.post('/update',(req,res) => {
    todos = req.body; //Note: without body-parser req.body would be undefined.
    res.send('updated todolist'); //Send a message back confirming that the todos have been updated
    fs.writeFile('todos.txt',JSON.stringify(todos),'utf8',(err) => {
        if(err){
            console.log(err);
        }
    });
})

app.listen(PORT,function(){
    console.log(`running rest-api server on port: ${PORT}`)
});