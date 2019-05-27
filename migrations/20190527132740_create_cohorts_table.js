exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
    //create primary key, auto increments
    tbl.increments();

    //create column name not null and unique
    tbl
      .varchar('name', 255)
      .notNullable()
      .unique();

    //enable created_at and updated_at timestamps
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
