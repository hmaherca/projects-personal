const router = require('express').Router();
const {Car, Dealership} = require('../models');

//Create array of attributes for Car on server start
//This lets us check which attributes are actually part of the car object without having to query our database each time
let attributes;
Car.where({})
    .fetch()
    .then(car => {
        attributes = Object.keys(car.attributes);
    })

// ROUTES
//GET Endpoint for getting multiple cars
router.get('/', (req, res) => {
    //Check every key in the query object against the array of attributes
    //If the key is in attributes, include it in the where object.
    //If it's not in the attributes array, it is ignored.
    //This is how we filter out invalid queries like 'yearsss'
    const where = {};
    for (let key in req.query) {
        if (attributes.includes(key)) {
            where[key] = req.query[key];
        }
    }

    //Using the verified where object we constructed, we fetch all cars that have the right attributes
    Car.where(where)
        .fetchAll({withRelated: 'dealership'})
        .then(cars => {
            //Object.assign() is a way of making a combining objects to make a new one, check the next endpoint for a more detailed explanation
            if (req.query.includeDealership === 'true') {
                res.json(cars.models.map(car => Object.assign({}, car.attributes, {dealership: car.related('dealership').attributes})));
            } else {
                //if not requested, simply send back a car without the dealership information
                res.json(cars.models.map(car => car.attributes));
            }
        })
        .catch(e => {
            //'catch' methods in promises are used to 'catch' any errors that occur in the previous promises in the chain.
            //The advantage of using a catch method is that these errors won't crash the program anymore, they'll be recorded and the program continues.
            console.log(e)
            res.status(500).send(e);
        })
});

//GET Endpoint for getting a specific car
router.get('/:id', (req, res) => {
    //To simplify our endpoint, we fetch the dealership information every time, and only send it along if requested.
    Car.where({id: req.params.id})
        .fetch({withRelated: 'dealership'})
        .then(car => {
            if (req.query.includeDealership === 'true') {
                /*
                We use Object.assign() here to create a new object containing both the car and dealership information without causing any side effects.
                The simpler, expanded of this would be something like:
                let newObject = car.attributes;
                newObject.dealership = car.related('dealership').attributes;
                */
                let carWithDealership = Object.assign({}, car.attributes, {dealership: car.related('dealership').attributes})
                res.json(carWithDealership);
            } else {
                res.json(car.attributes);
            }
        })
        .catch(e => {
            console.log(e)
            res.status(500).send(e);
        })
})

//POST Endpoint for saving new cars
router.post('/', (req, res) => {
    //Just like how we verify the query object, we remove any extra or incorrect properties in req.body
    //If someone tries to save a car with a 'yearsss' attribute, it will be ignored
    let newCar = {};
    for (let key in req.body) {
        if (attributes.includes(key)) {
            newCar[key] = req.body[key];
        }
    }

    //Save the new car
    new Car(newCar)
        .save()
        .then(car => {
            res.json(car.attributes);
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

//PUT Endpoint for updating cars
router.put('/:id', (req, res) => {
    //Again, verify new dealership object before trying to update
    let updateCar = {};
    for (let key in req.body) {
        if (attributes.includes(key)) {
            updateCar[key] = req.body[key];
        }
    }

    //Update car with the specified id
    Car.where({id: req.params.id})
        .save(updateCar, {patch: true})
        .then(car => {
            res.json(car.attributes);
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

//DELETE Endpoint for deleting cars
router.delete('/:id', (req, res) => {
    //Find car with the given id, then destroy it
    Car.where({id: req.params.id})
        .destroy()
        .then(car => {
            res.json(car.attributes);
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

//Export the router endpoints we have created so our server can use them
module.exports = router;