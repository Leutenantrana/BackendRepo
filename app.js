const express = require('express')
const app = express();
const connectDb = require('./models/config/db')
const cors = require('cors')
const notesRouter = require('./controllers/notesRouter')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/loginRouter')
const middlewares = require('./utils/middlewares')

connectDb()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(middlewares.requestLogger)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)
module.exports = app