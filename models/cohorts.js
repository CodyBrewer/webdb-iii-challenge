const db = require('../data/dbConfig');

const find = () => {
  return db('cohorts');
};

const findById = id => {
  return db('cohorts')
    .where({ id })
    .first();
};

const add = cohort => {
  return db('cohorts').insert(cohort);
};

const remove = id => {
  return db('cohorts')
    .where({ id })
    .delete();
};

const update = (id, changes) => {
  return db('cohorts')
    .where({ id })
    .update(changes);
};

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};
