const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema.
// Note: we're specifying a timestamps option when we create our schema, so that we don't have to write a custom pre-save method for generating our timestamps
const carSchema = new Schema({
  make: String,
  model: String,
  year: String,
  dealership_id: String,
}, { timestamps: { createdAt:'created_at', updatedAt:'updated_at'}});

// Create a model using schema.
var Car = mongoose.model('Car', carSchema);

// Make this available to our Node applications.
module.exports = Car;