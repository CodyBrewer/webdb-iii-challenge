exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    //id: primary ket, auto increments
    tbl.increments();
    //name: text, required
    tbl.varchar('name', 255).notNullable();
    //cohort_id: references the id in the cohorts table
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id') // column
      .inTable('cohorts') //table
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    //enable timestamps for created_at and updated_at
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
