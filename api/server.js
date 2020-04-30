const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../users/authenticate-middleware');
usersRouter = require('../users/users-router');
plantsRouter = require('../plants/plants-router');
authRouter = require('../auth/auth-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({ message: `api up` });
});

server.use('/api/auth', authRouter);
server.use('/api/plants', authenticate, plantsRouter);
server.use('/api/users', authenticate, usersRouter);

module.exports = server;
