const db = require('../data/dbConfig');

const find = () => {
  return db('students');
};

const findById = id => {
  return db('students')
    .where({ id })
    .first();
};

const add = student => {
  return db('students').insert(student);
};

const remove = id => {
  return db('students')
    .where({ id })
    .delete();
};

const update = (id, changes) => {
  return db('students')
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
