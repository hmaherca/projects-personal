const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const bcrypt        = require('bcryptjs');
const jwt           = require('jsonwebtoken');

//middleware
const authorize     = require('./middleware/authorize');

//application
const app = express();
const PORT = 3005;
app.use(bodyParser.json());

//Changing what has permission to access our server.
//Note that we're allowing an 'authorization' header here, which we will use to send our authTokens
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  next();
});

//POST endpoint for registration and encrypting passwords
app.post('/encrypt',(req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    //encrypt password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
                // Store hash in your password DB. 
                if(err) console.log(err);

                fs.writeFile('notpasswords/'+username+'.txt',hash, (err) => {
                    if(err) throw err;
                    res.json('Password Saved');
                });
            });
        });
});

//POST endpoint for logging in and generating authTokens
app.post('/login', (req,res) => {
    let username = req.body.username;
    let password = req.body.password;
    //we search our passwords folder for the file with the appropriate user info.
    fs.readFile('notpasswords/'+username+'.txt', (err,data) => {
        if(err){
            console.log(err);
            res.status(403).send(err);
        } else {
            //compare the plaintext password given by the user with the hashed password from the file.
            //bcrypt.compare() will hash the password for us and compare the hashes
            bcrypt.compare(password, data.toString(), function(err, result) {
                if(result){
                    //If the passwords match, create a token using a secret key and place the username inside the token
                    let token = jwt.sign({username:username},'brainstationkey');

                    //Then send the token back to the client
                    res.json({token:token});
                }
                else{
                    res
                    .status(403)
                    .send({token:null});
                }
            });
        }
    })
})

//GET endpoint for '/privatedata' with our 'authorize' middleware included
//Any requests made to this endpoint will have to pass through the middleware before it reaches the code here.
app.get('/privatedata',authorize, (req,res) => {
    //If this endpoint is reached, send a response back with the username that was decoded from the token.
    res.json({username:req.decoded.username});
});

app.listen(PORT, () => {
    console.log('Server Started on http://localhost:%s',PORT);
    console.log('Press CTRL + C to stop server');
});