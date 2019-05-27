const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cohortsRouter = require('./routes/cohorts');
const studentRouter = require('./routes/students');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(express.json());
server.use('/api/cohorts', cohortsRouter);
server.use('/api/cohorts/:id/students', studentRouter);

module.exports = server;
