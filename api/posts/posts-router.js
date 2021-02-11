const express = require('express');
const Posts = require('./posts-model');
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Posts.get(req.query)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id', mw.validatePostId, (req, res, next) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  const { id } = req.params;

  Posts.getById(id)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch(error => {
    next(error)
  })
});

// do not forget to export the router
module.exports = router;
