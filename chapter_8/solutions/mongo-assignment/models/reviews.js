const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for reviews, with automatic timestamps.
// The default names for mongoose timestamps are createdAt and updatedAt, so we will rename them.
const reviewsSchema = new Schema({
    stars: {
      type:Number,
      max:[5, 'Maximum is 5 stars!'],
      min:0
    },
    comment: String,
}, { timestamps: { createdAt:'created_at', updatedAt:'updated_at'}});

// Create a model using schema.
var Review = mongoose.model('Review', reviewsSchema);

// Make this available to our Node applications.
module.exports = Review;
