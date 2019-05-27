const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

const server = express();

server.use(helmet());
server.use(logger('dev'));
server.use(express.json());

module.exports = server;
