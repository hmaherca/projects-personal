const Dealership = require('../models/dealerships');
const dealershipsToSeed = [
    {make: 'Hyundai', city: 'Toronto', province: 'ON', postal_code: 'M4M 2E4', street: '21 Broadview Ave', reviews: []},
    {make: 'Hyundai', city: 'Thornhill', province: 'ON',  postal_code: 'L4J 1V8', street: '7200 Yonge St', reviews: []}    
] 

// We export an anonymous function that will be run when the server starts
module.exports = () => {
    //Check to see if there are any databases, should only seed if database table is empty
    Dealership.find({}, (err, dealerships) => {
        if (err) {
            console.log(err)
        } else {
            if (dealerships.length === 0) {
                //The Model.collection.insert() method of creation is the fastest way of creating new rows in your database,
                //but it bypasses some of mongoose's validation methods, meaning that it doesn't trigger methods like pre-save.
                //You can see that the seeded dealerships and cars don't get created_at and updated_at timestamps added because of this.
                // Dealership.collection.insert(dealershipsToSeed, (err, dealerships) => {
                //     console.log(dealerships)
                // })

                //If you want the validation methods like pre-save to run when saving multiple rows, you can use mongoose's Model.create().
                //The drawback here is that it will be much slower than Model.collection.insert, and so may not be suitable for large datasets.
                //Even if you use the timestamps option in your schema, you will still need to use Model.create() or Model.save, since mongoose generates the timestamps as part of its validation process.
                
                //Since Model.create() is slower, it is likely that the cars will not seed the first time you run the index.js, since the 2 dealerships won't be created yet.
                //Simply run the server again after seeding the dealerships to seed the cars
                Dealership.create(dealershipsToSeed, (err, dealerships) => {
                    console.log(dealerships)
                })
            }
        }
    })
}