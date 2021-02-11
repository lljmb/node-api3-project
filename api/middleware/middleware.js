const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')
const { post } = require('../server')

function logger(req, res, next) {
  // do your magic!
  console.log(`****Logger****
    Method: ${req.method}
    URL: http://localhost:1213${req.url} 
    Timestamp: ` + new Date())
  next()
}

const validateUserId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params
  try {
    const user = await Users.getById(id)
    if (!user) {
      res.status(404).json({
        message: 'user not found'
      })
    } else {
      req.user = user
      next()
    }
  } catch(e) {
    res.status(500).json(`server error: ${e}`)
  }
}

const validateUser = async (req, res, next) => {
  // do your magic!
  const user = req.body
  if (user.name === undefined){
    res.status(400).json({message: 'missing user data'})
  } else {
    if (!user.name){
      res.status(400).json({message: 'missing required name field'})
    } else {
      next()
    }
  }
}

const validatePost = async (req, res, next) => {
  // do your magic!
  if (req.body.text === undefined){
    res.status(400).json({message: 'missing post data'})
  } else {
    if (!req.body.text){ 
      res.status(400).json({message: 'missing required text field'})
    } else {
      next()
    }
  }
}

const validatePostId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params
  try {
    const post = await Posts.getById(id)
    if (!post) {
      res.status(404).json({
        message: 'post not found'
      })
    } else {
      req.post = post
      next()
    }
  } catch(e) {
    res.status(500).json(`server error: ${e}`)
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost, 
  validatePostId
}