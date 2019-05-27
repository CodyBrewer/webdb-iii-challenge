const cohorts = require('../models/cohorts');
const students = require('../models/students');

const validateCohortId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cohort = await cohorts.findById(id);
    if (cohort) {
      req.cohort = cohort;
      next();
    } else {
      res.status(404).json({ message: 'cohort not found; invalid id' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request' });
  }
};
const validateStudentId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await students.findById(id);
    if (student) {
      req.student = student;
      next();
    } else {
      res.status(404).json({ message: 'students not found; invalid id' });
      console.log(`student is `, student);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request' });
  }
};

const requiredBody = (req, res, next) => {
  if (req.body && Object.keys(req.body).length) {
    // go on to the next bit of middleware
    next();
  } else {
    // jump to a error handler bit of middleware
    next({ message: 'Please include request body' });
    res.status(400).json({ message: 'Please include request body' });
  }
};
module.exports = {
  validateCohortId,
  validateStudentId,
  requiredBody
};
