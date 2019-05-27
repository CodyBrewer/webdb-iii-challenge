exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'Jake', cohort_id: 1 },
        { name: 'Amy', cohort_id: 2 },
        { name: 'Boyle', cohort_id: 3 }
      ]);
    });
};
