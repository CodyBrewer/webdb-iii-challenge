const express = require('express');

const Students = require('../models/students');
const { validateStudentId, requiredBody } = require('../middleware');
const idBodyCheck = [validateStudentId, requiredBody];
const studentsRouter = express.Router();

const { find, remove, add, update } = Students;

studentsRouter.use((req, res, next) => {
  console.log('studentsRouter working');
  next();
});

studentsRouter.get('/', async (req, res) => {
  try {
    const Students = await find();
    res.status(200).json(Students);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving students'
    });
  }
});

studentsRouter.get('/:id', validateStudentId, async (req, res) => {
  res.status(200).json(req.student);
});

studentsRouter.post('/', requiredBody, async (req, res) => {
  try {
    const student = await add(req.body);
    res.status(201).json(student);
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error adding the student'
    });
  }
});

studentsRouter.delete('/:id', validateStudentId, async (req, res) => {
  try {
    const count = await remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The student has been deleted' });
    } else {
      res.status(404).json({ message: 'The student could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error deleting the student'
    });
  }
});

studentsRouter.put('/:id', idBodyCheck, async (req, res) => {
  try {
    const student = await update(req.params.id, req.body);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'The student could not be found' });
    }
  } catch (error) {
    // log error to server
    console.log(error);
    res.status(500).json({
      message: 'Error updating the student'
    });
  }
});
module.exports = studentsRouter;
