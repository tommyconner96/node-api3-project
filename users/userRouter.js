const express = require('express')
const db = require("./userDb")
const router = express.Router()
const postDB = require("../posts/postDb")

//POST a new user
router.post('/', validateUser, (req, res, next) => {
  db
    .insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
})
//POST a new post
router.post('/:id/posts', validatePost, (req, res) => {
  const body = req.body
  body.user_id = req.params.id
  postDB.insert(body)
    .then(post => {
      res.status(201).json({ post })
    })
    .catch(err => {
      res.status(400).json({ message: 'something went wrong!' })
    })
})

//gets users
router.get('/', (req, res, next) => {
  db
    .get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
})
//get user by id
router.get('/:id', validateUserId, (req, res, next) => {
  db.getById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
})
//get users posts by user ID
router.get('/:id/posts', validateUserId, (req, res, next) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
})
//delete user
router.delete('/:id', validateUserId, (req, res, next) => {
  db.remove(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
})

router.put('/:id', validateUser, (req, res, next) => {
  db
    .update(req.params.id, req.body)
    .then(user => {
      res.status(200).json({ message: "user updated" })
    })
    .catch((error) => {
      next(error)
    })
})

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(400).json({ error: "Invalid User ID." })
      }
    })
    .catch((error) => {
      next(error)
    })
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    req.body.name
      ? next()
      : res.status(400).json({
        error: "missing required name field"
      })
  } else {
    res.status(400).json({
      error: "missing user data"
    })
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length !== 0) {
    req.body.text
      ? next()
      : res.status(400).json({
        error: "Missing Required text field."
      })
  } else {
    res.status(400).json({
      error: "Missing post data"
    })
  }
}

module.exports = router
