const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const helper = require('./test-helper')
const Ticket = require('../models/tecket')

beforeEach(async () => {
    await Ticket.deleteMany({})

    for (let ticket of helper.tickets) {
        const ticketObject = new Ticket(ticket)
        await ticketObject.save()
    }
})

describe('when there are initially some tickets', () => {
    test('tickets are returned as json', async () => {
        const result = await api.get('/api/tickets')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all tickets are retured', async () => {
        const result = await api.get('/api/tickets')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(result.body).toHaveLength(helper.tickets.length)
    })

    test('a specific ticket is within the returned tickets', async () => {
        const result = await api.get('/api/tickets')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const names = result.body.map(t => t.name)
        expect(names).toContain(helper.tickets[0].name)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})