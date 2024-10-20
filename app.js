const express = require("express")
const mongoose = require('mongoose')
require('dotenv').config()

const studentsRoute = require("./routes/students")
const subjectsRoute = require('./routes/subjects')
const authsRoute = require('./routes/auths')
const authMiddleware = require('./middlewares/authMiddlewares')

const app = express()

//Middleware
app.use(express.json())
// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI).then(
	() => console.log('Successful connection to the database')
).catch(
	(error) => console.error('Failed to connect to the database', error)
)
//Routes
app.use("/api/students", studentsRoute)
app.use('/api/subjects', authMiddleware, subjectsRoute)
app.use('/api', authsRoute)

module.exports = app



