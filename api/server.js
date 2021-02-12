const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');


const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');
const mw = require('./middleware/middleware');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(helmet());
server.use(express.json(), morgan('dev'));

// global middlewares and routes need to be connected here
server.use(mw.logger);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter)

server.use('/', (_, res) => {
  res.status(400).json({message: 'i pray this works'})
})

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });


module.exports = server;
