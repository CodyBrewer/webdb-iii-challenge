const express = require('express');

const Cohorts = require('./CohortsModel.js');
const { validateCohortId, requiredBody } = require('./middleware');
const idBodyCheck = [validateCohortId, requiredBody];
const cohortsRouter = express.Router();

const { find, remove, add, update } = Cohorts;

cohortsRouter.use((req, res, next) => {
  console.log('cohortRouter working');
  next();
});

cohortsRouter.get('/', async (req, res) => {
  try {
    const Cohorts = await find();
    res.status(200).json(Cohorts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving Cohorts'
    });
  }
});

cohortsRouter.get('/:id', validateCohortId, async (req, res) => {
  res.status(200).json(req.cohort);
});

cohortsRouter.post('/', requiredBody, async (req, res) => {
  try {
    const cohort = await add(req.body);
    res.status(201).json(cohort);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the cohort'
    });
  }
});

cohortsRouter.delete('/:id', validateCohortId, async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The cohort has been deleted' });
    } else {
      res.status(404).json({ message: 'The cohort could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error deleting the cohort'
    });
  }
});

cohortsRouter.put('/:id', idBodyCheck, async (req, res) => {
  try {
    const cohort = await update(req.params.id, req.body);
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: 'The cohort could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the cohort'
    });
  }
});

module.exports = cohortsRouter;
