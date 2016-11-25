const router = require('express').Router();
const {Car, Dealership} = require('../models'); // grab the Car and Dealership models from the models folder

// More detailed comments can be found in the cars routes. 
// Most of the endpoint code will be very similar, so it should be easy to translate the code from cars to dealerships

// create array of attributes for Dealership on server start
// this lets us check which attributes are actually part of the car object without having to query our database each time
let attributes;
Dealership
    .where({})
    .fetch()
    .then(dealership => {
        attributes = Object.keys(dealership.attributes);
    })
    
// ROUTES FOR DEALERSHIPS
//GET endpoint for multiple dealerships
router.get('/', (req, res) => {
    const where = {}
    for (let key in req.query) {
        if (attributes.includes(key)) {
            where[key] = req.query[key]
        }
    }

    Dealership.where(where)
        .fetchAll({withRelated: 'cars'})
        .then(dealerships => {
            if (req.query.includeCars === 'true') {
                res.json(dealerships.models.map(dealership => Object.assign({}, dealership.attributes, {cars: dealership.related('cars').models.map(car => car.attributes)})));
            } else {
                res.json(dealerships.models.map(dealership => dealership.attributes));
            }
        })
        .catch(e => {
            res.status(500).send(e);
        })
});

//GET Endpoint for specific dealership
router.get('/:id', (req, res) => {
    Dealership.where({id: req.params.id})
        .fetch({withRelated: 'cars'})
        .then(dealership => {
            if (req.query.includeCars === 'true') {
                let dealershipWithCars = Object.assign({}, dealership.attributes, {cars: dealership.related('cars').models.map(car => car.attributes)})
                res.json(dealershipWithCars);
            } else {
                res.json(dealership.attributes);
            }
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

//POST Endpoint for adding new dealership
router.post('/', (req, res) => {
    let newDealership = {};
    for (let key in req.body) {
        if (attributes.includes(key)) {
            newDealership[key] = req.body[key];
        }
    }

    new Dealership(newDealership).save()
        .then(dealership => {
            res.json(dealership.attributes);
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

//PUT Endpoint for updating dealerships
router.put('/:id', (req, res) => {
    let updateDealership = {};
    for (let key in req.body) {
        if (attributes.includes(key)) {
            updateDealership[key] = req.body[key];
        }
    }

    Dealership.where({id: req.params.id})
        .save(updateDealership, {patch: true})
        .then(dealership => {
            res.json(dealership.attributes);
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

//DELETE Endpoint for deleting dealerships
router.delete('/:id', (req, res) => {
    Dealership.where({id: req.params.id})
        .destroy()
        .then(dealership => {
            res.json(dealership.attributes);
        })
        .catch(e => {
            res.status(500).send(e);
        })
})

module.exports = router;