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

const errorHandler = () => {
    logger.error(error.name)

    next(error)
}

module.exports = { requestLogger, unknownEndpointHandler, errorHandler }