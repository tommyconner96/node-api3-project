// const express = require('express');

// const server = express();

// server.get('/', (req, res) => {
//   res.send(`<h2>Let's write some middleware!</h2>`);
// });

// //custom middleware

// function logger(req, res, next) {}

// module.exports = server;

const express = require("express")
const logger = require("./middleware/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")


const server = express()
const port = process.env.PORT || 8888

server.use(express.json())
server.use(logger())
server.use("/users", userRouter)
server.use("/posts", postRouter)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong, please try again later",
  })
})

server.listen(port, () => {
  console.log(`Server running at port: ${port}`)
})
