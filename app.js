const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const ticketsRouter = require('./controllers/tickets')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('connected to mongodb'))
    .catch(error => logger.error(error))

const app = express()

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/tickets', ticketsRouter)

app.use(middleware.unknownEndpointHandler)
app.use(middleware.errorHandler)

module.exports = app