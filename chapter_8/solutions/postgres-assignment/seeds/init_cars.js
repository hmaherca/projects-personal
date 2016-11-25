
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cars').insert({make:'Hyundai',model:'Elantra',year:2015,dealership_id:1}),
        knex('cars').insert({make:'Hyundai',model:'Sonata',year:2016,dealership_id:1}),
        knex('cars').insert({make:'Hyundai',model:'Sonata',year:2016,dealership_id:2}),
        knex('cars').insert({make:'Hyundai',model:'Elantra',year:2016,dealership_id:2}),
        knex('cars').insert({make:'Hyundai',model:'Tucson',year:2017,dealership_id:2}),
      ]);
    });
};
