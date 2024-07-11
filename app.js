const express = require('express')
const app = express();
const connectDb = require('./models/config/db')
const cors = require('cors')
const notesRouter = require('./controllers/notesRouter')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middlewares = require('./utils/middlewares')

connectDb()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)
app.use('/api/notes', notesRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)
module.exports = app