const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creating a copy of the review schema so we can use it for our reviews array in our dealership schema.
//A better option would be to export the reviews schema and then import it for use here, which is shown below.
const reviewsSchema = new Schema({
    stars: {
      type:Number,
      max:[5, 'Maximum is 5 stars!'],
      min:0
    },
    comment: String,
}, { timestamps: {createdAt:'created_at', updatedAt:'updated_at'}});

//Importing the reviewSchema (if you don't want to have to copies of the review schema)
//The advantage of doing this is that if you want to change the review Schema, you only have to change it once instead of changing it in both files
//Mongoose conveniently saves the schema whenever a model is created inside Model.schema, which makes it easy to access the review schema.
//
//We require the review model as we've been doing in our routes, and then target the 'schema' property of the object.
//This 'importSchema' will be the schema that was used to create the review model
const importSchema = require('./reviews').schema;

// Create a schema for dealerships
const dealershipSchema = new Schema({
  make: String,
  city: String,
  province: String,
  postal_code: String,
  street: String,
  name: String,
  reviews: [importSchema],
  created_at: Date,
  updated_at: Date
});

//Add created_at and updated_at
//Note: there is a way to tell mongoose to do this automatically, by adding a 'timestamps' option when creating the schema.
//The cars and review schemas use this timestamp option as an example of how to do it without a pre-save function
dealershipSchema.pre('save', function(next) {
    // Get the current date.
    const currentDate = new Date();

    // Change the updated_at field to current date.
    this.updated_at = currentDate;

    // If created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }

    // Continue.
    next();
});

// Create a model using schema.
var Dealership = mongoose.model('Dealership', dealershipSchema);

// Make this available to our Node applications.
module.exports = Dealership;