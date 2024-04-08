const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:', request.path)
    logger.info('Body:', request.body)
    logger.info('___')

    next()
}

const unknownEndpointHandler = (request, response, next) => {
    response.status(400).send({ error: 'unknown endpoint' })

}

const errorHandler = (error, request, response, next) => {
    logger.error(error.name)

    if (error.name === 'CastError') {
        return response.status(400).json({ error: "malformatted id" })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

module.exports = { requestLogger, unknownEndpointHandler, errorHandler }