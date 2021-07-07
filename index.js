// const express = require("express")
// const logger = require("./middleware/logger")
// // const welcomeRouter = require("./welcome/welcome-router")
// // const usersRouter = require("./users/users-router")
// const userRouter = require("./users/userRouter")

// const server = express()
// const port = 8888

// server.use(express.json())
// server.use(logger())

// // server.use(welcomeRouter)
// server.use(userRouter)

// server.use((err, req, res, next) => {
// 	console.log(err)
// 	res.status(500).json({
// 		message: "Something went wrong, please try again later",
// 	})
// })

// server.listen(port, () => {
// 	console.log(`Server running at port: ${port}`)
// })
