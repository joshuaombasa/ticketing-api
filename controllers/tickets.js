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

ticketsRouter.get('/:id', async (request, response, next) => {
    try {
        const ticket = await Ticket.findById(request.params.id)
        if (!ticket) {
            return response.status(404).json({ error: 'nonExistent Id' })
        }
        response.json(ticket)
    } catch (error) {
        next(error)
    }
})

ticketsRouter.post('/', async (request, response, next) => {
    const { name, show, price, isAvailable } = request.body

    const ticketObject = new Ticket({ name, show, price, isAvailable })
    try {
        const savedTicket = await ticketObject.save()
        response.status(201).json(savedTicket)
    } catch (error) {
        next(error)
    }
})

ticketsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Ticket.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = ticketsRouter