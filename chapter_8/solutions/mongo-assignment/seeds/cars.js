const mongoose = require('mongoose');
const Dealership = require('../models/dealerships');
const Car = require('../models/cars');


module.exports = () => {
    // First, check if there are any cars, we only want to seed if our cars table is empty
    Car.find({}, (err, cars) => {
        if (err) {
            console.log(err);
        } else if (cars.length === 0) {
            // Since our cars to seed are assigned to the first 2 dealerships, we need to make sure there are at least two dealerships available before seeding
            Dealership.find({}, (err, dealerships) => {
                if (err) {
                    console.log(err);
                } else {
                    if (dealerships.length < 2) {
                        console.log('No dealership to use for seeding cars');
                    } else {
                        const carsToSeed = [
                            {make: 'Hyundai', model: 'Elantra', year: 2017, dealership_id: dealerships[0]._id},
                            {make: 'Hyundai', model: 'Elantra', year: 2016, dealership_id: dealerships[0]._id},
                            {make: 'Hyundai', model: 'Elantra', year: 2017, dealership_id: dealerships[1]._id}
                        ];
                        // See the dealerships seed file for an explanation of why we're using create instead of collection.insert
                        // Car.collection.insert(carsToSeed, (err, cars) => {
                        //     console.log(cars)
                        // })
                        Car.create(carsToSeed, (err,cars) => {
                            console.log(cars)
                        })
                    }
                }
            })            
        }
    })
}
