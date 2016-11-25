const router = require('express').Router();
const Car = require('../models/cars'); //Getting the Car model from the models folder

// ROUTES
//GET endpoint for getting all cars
router.get('/', (req, res) => {
    Car.find({})
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});


//GET Endpoint for getting one specific car
router.get('/:id', (req, res) => {
    Car.findById(req.params.id)
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//POST Endpoint for saving a new car
router.post('/', (req, res) => {
    //Unlike with postgres, mongoose will validate the new car before saving it into the database.
    //Even if extra information is sent in the request (like a yearsss property), it will be automatically ignored
    Car(req.body).save()
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//PUT Endpoint for updating cars
router.put('/:id', (req, res) => {
    Car.findByIdAndUpdate(req.params.id, req.body)
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//DELETE Endpoint for deleting cars
router.delete('/:id', (req, res) => {
    Car.findByIdAndRemove(req.params.id)
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

module.exports = router;