const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 8080; //default port is 8080

//Tell our app to use bodyParser when receiving requests
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Since we will have a lot of API endpoints for dealing with both cars and dealerships,
// we will split those into their own files and then require them into this server file
const cars_routes = require('./routes/cars');
const dealerships_routes = require('./routes/dealerships');

//Here we tell our express app when to use the imported routes.
//Whenever a request comes to an endpoint starting with '/api/cars', that request will be directed to the car routes
//Check the files in the routes folder to see the endpoints for PART 2 for the assignment 
app.use('/api/cars', cars_routes);
app.use('/api/dealerships', dealerships_routes);

//Listen on the specified port
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})

// Note that we are not doing anything with knex or bookshelf here. That has been moved to the index.js inside the models folder.
// Since the API endpoints have been moved to their own files, the bookshelf models will be required there, where they are needed,
// but not in this file.


//PART 1: BOOKSHELF METHODS/QUERIES

// // CREATE NEW CAR
// const newCar = new Car({
//     make: 'Hyundai',
//     model: 'Elantra',
//     year: 2014,
//     dealership_id: 2
// })
// newCar.save()
// .then(model => {
//     console.log(model)
// })

// GET ALL CARS
// Car
// .fetchAll()
// .then(cars => {
//     console.log(cars.models.map(car => car.attributes))
// })

// // GET CARS WITH FILTER
// Car
// .where({year: 2017})
// .fetchAll()
// .then(cars => {
//     console.log(cars.models.map(car => car.attributes))
// })

// // GET A SINGLE CAR
// Car
// .where({id: 2})
// .fetch()
// .then(car => {
//     console.log(car.attributes)
// })
// OR
// new Car({id: 1})
//     .fetch()
//     .then(car => {
//         console.log(car.attributes);
//     })

// // UPDATE CAR
// const attributesToUpdate = {
//     year: 2011
// }
// new Car({id: 1})
//     .save(attributesToUpdate, {patch: true})
//     .then(car => {
//         console.log(car.attributes)
//     })

// // GET DEALERSHIP OF CERTAIN CAR
// Car.where({id: 2})
// .fetch({withRelated: 'dealership'})
// .then(car => {
//     console.log(car.related('dealership').attributes)
// })

// // GET ALL CARS OF CERTAIN DEALERSHIP
// Dealership.where({id: 1})
// .fetch({withRelated: 'cars'})
// .then(dealership => {
//     const cars = dealership.related('cars')
//     console.log(cars.models.map(car => car.attributes))
// })
