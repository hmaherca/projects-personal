const router = require('express').Router();
const Dealership = require('../models/dealerships');
const Review = require('../models/reviews');

// ROUTES
//GET Endpoint for getting all dealerships
router.get('/', (req, res) => {
    Dealership.find({})
        .then(dealerships => {
            res.json(dealerships);
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

//GET Endpoint for getting a specific dealership
router.get('/:id', (req, res) => {
    Dealership.findById(req.params.id)
        .then(dealership => {
            res.json(dealership)
        })
        .catch(err => {
            res.status(500).send(err);
        })
});

//GET Endpoint for getting all reviews of a specific dealership
router.get('/:id/reviews', (req, res) => {
    Dealership.findById(req.params.id)
        .then(dealership => {
            res.json(dealership.reviews);
        })    
        .catch(err => {
            res.status(500).send(err);
        })
})

//GET Endpoint for getting a specific review
//Note: since the reviews are saved as embedded documents inside dealerships, a dealership id must be provided to get a specific review
router.get('/:id/reviews/:review_id', (req, res) => {
    Dealership.findById(req.params.id)
        .then(dealership => {
            //We are using mongoose's .id() method here to find the review we need.
            //This method is a special feature of DocumentArrays in mongoose.
            //We will also use this method to update and delete reviews
            const review = dealership.reviews.id(req.params.review_id);
            res.json(review);
        })    
        .catch(err => {
            res.status(500).send(err);
        })
})

//POST Endpoint for saving a new dealership
router.post('/', (req, res) => {
    Dealership(req.body).save()
        .then(dealership => {
            res.json(dealership);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//POST Endpoint for adding a review to a specific dealership
router.post('/:id/reviews', (req, res) => {
    //First find the specified dealership
    Dealership.findById(req.params.id)
        .then(dealership => {
            //We make a new review using the request body, and then push it into the reviews array of our dealership.
            dealership.reviews.push(Review(req.body));
            //Since the reviews are embedded inside the dealerships, we save the dealership instead of saving the review.
            dealership.save()
                .then(dealership => {
                    res.json(dealership.reviews);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
            
        })    
        .catch(err => {
            res.status(500).send(err);
        })
})

//PUT Endpoint for updating dealerships
router.put('/:id', (req, res) => {
    Dealership.findByIdAndUpdate(req.params.id, req.body)
        .then(dealership => {
            res.json(dealership);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//PUT Endpoint for updating a specific review of a dealership
//Note that we need both the dealership and the review id, just like for getting a specific review
router.put('/:id/reviews/:review_id', (req, res) => {

    Dealership.findById(req.params.id)
        .then(dealership => {
            //Using the .id() method to get the review with our id
            const review = dealership.reviews.id(req.params.review_id);
            //We loop through the keys in the request body and modify our review appropriately.
            //We do it this way instead of 'review = req.body' in case a user doesn't provide all the necessary information (for example, just comment or just stars)
            //Because the review was constructed with a mongoose model, it will not allow adding extra properties, so any additional data in the body won't affect the review.
            for (let key in req.body) {
                review[key] = req.body[key];
            }
            //Once the review has been changed, save the dealership with the modified review
            dealership.save()
                .then(dealership => {
                    res.json(dealership.reviews);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        })    
        .catch(err => {
            res.status(500).send(err);
        })
})

//DELETE Endpoint for deleting a dealership
router.delete('/:id', (req, res) => {
    Dealership.findByIdAndRemove(req.params.id)
        .then(dealership => {
            res.json(dealership);
        })
        .catch(err => {
            res.status(500).send(err);
        })
})

//DELETE Endpoint for deleting a specific review from a dealership
router.delete('/:id/reviews/:review_id', (req, res) => {
    Dealership.findById(req.params.id)
        .then(dealership => {
            //Get the review we want with .id(), remove it and then save.
            //Note that we are using the .remove() method on review, but still saving the dealership.
            const review = dealership.reviews.id(req.params.review_id);
            review.remove();
            dealership.save()
                .then(dealership => {
                    res.json(dealership.reviews);
                })
                .catch(err => {
                    res.status(500).send(err);
                })
        })    
        .catch(err => {
            res.status(500).send(err);
        })
})

module.exports = router;