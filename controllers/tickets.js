const Ticket = require('../models/tecket')
const ticketsRouter = require('express').Router()

ticketsRouter.get('/', async (request, response, next) => {
    try {
        const tickets = await Ticket.find({})
        response.json(tickets)
    } catch (error) {
        next(error)
    }
})

module.exports = ticketsRouter