// Initializing knex and connecting to our db
const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'postgres',
    database : 'carsdb',
    charset  : 'utf8'
  }
});

const bookshelf = require('bookshelf')(knex);

//Creating the Car model, and add a relation indicating that cars belong to dealerships
const Car = bookshelf.Model.extend({
    tableName: 'cars',
    dealership: function() {
        return this.belongsTo(Dealership)
    }
})


//Create a dealership model, and add a relation that indicates that dealerships can have multiple Cars
const Dealership = bookshelf.Model.extend({
    tableName: 'dealerships',
    cars: function() {
        return this.hasMany(Car)
    }
})

module.exports = {
    Car,
    Dealership
}