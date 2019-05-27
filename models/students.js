const db = require('../data/dbConfig');

const find = () => {
  return db('students')
    .join('cohorts', 'students.cohort_id', 'cohorts.id')
    .select(
      'students.id',
      'students.name as Student Name',
      'cohorts.name as Cohort Name',
      'cohorts.id as Cohor ID'
    );
};

const findById = id => {
  return db('students')
    .join('cohorts', 'students.cohort_id', 'cohorts.id')
    .where('students.id', id)
    .select(
      'students.id',
      'students.name as Student Name',
      'cohorts.name as Cohort Name'
    );
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
