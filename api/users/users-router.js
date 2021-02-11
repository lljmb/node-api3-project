const e = require('express');
const express = require('express');
const mw = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
  .then((users) => {
    res.status(200).json(users)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', mw.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const {id} = req.params
  const changes = req.body

  Users.update(id, changes)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({ message: 'error updating user'})
  })
});

router.delete('/:id', mw.validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;

  Users.remove(id)
  .then((user) => {
    res.status(200).json(user)
  })
  .catch((error) => {
    next(error)
  })
});

router.get('/:id/posts', mw.validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params

  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    next(error)
  })
  
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const post = { ...req.body, user_id: req.params.id }

  Posts.insert(post)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(error => {
    next(error)
  })
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: 'something broke',
    error: err.message
  })
})

// do not forget to export the router
module.exports = router;