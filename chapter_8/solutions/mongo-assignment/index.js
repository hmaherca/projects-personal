const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Connect to mongoose
mongoose.connect('mongodb://localhost/data/db/');

// Log to console any errors or a successful connection.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db at /data/db/")
});

//Seed our dealerships and cars
//Since our seed functions check that their respective table is empty before seeding, we can safely run these functions every time our server starts.
const seedDealerships = require('./seeds/dealerships');
const seedCars = require('./seeds/cars');
seedDealerships();
seedCars();

//Importing our routes and endpoints
const cars_routes = require('./routes/cars');
const dealerships_routes = require('./routes/dealerships');

//Use our imported routers whenever a requests starts with /api/cars or /api/dealerships
app.use('/api/cars', cars_routes);
app.use('/api/dealerships', dealerships_routes);

//listen on the specified port
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT}`);
})
