const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router');
const postsRouter = require('./posts/posts-router');
const mw = require('./middleware/middleware');

const server = express();

const publicPath = path.join(__dirname, '..', 'public')

// remember express by default cannot parse JSON in request bodies
server.use(helmet());
server.use(cors())
server.use(express.json(), morgan('dev'));
server.use(express.static(publicPath))

// global middlewares and routes need to be connected here
server.use(mw.logger);
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.get('*', (res, req) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

module.exports = server;
