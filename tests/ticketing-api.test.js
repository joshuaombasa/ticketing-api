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

describe('when there are initially some tickets saved', () => {
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

describe('viewing a specific ticket', () => {
    test('succeeds when given a valid id', async () => {
        const ticketsInDb = await helper.ticketsInDb()
        const response = await api.get(`/api/tickets/${ticketsInDb[0].id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('fails with statuscode 404 if the id is nonexistent', async () => {
        const nonExistentId = await helper.nonExistentId()
        const response = await api.get(`/api/tickets/${nonExistentId}`)
            .expect(404)
    })

    test('fails with statuscode 400 if the id is invalid', async () => {
        const invalidId = 'wefwfwf'
        const response = await api.get(`/api/tickets/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new ticket', () => {
    test('succeeds with valid data', async () => {
        const ticketsAtStart = await helper.ticketsInDb()
        const response = await api.post('/api/tickets/')
            .send(helper.validTestTicket)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const ticketsAtEnd = await helper.ticketsInDb()
        expect(ticketsAtEnd).toHaveLength(ticketsAtStart.length + 1)
    })

    test('fails with statuscode 400 if the 400 is invalid', async () => {
        const ticketsAtStart = await helper.ticketsInDb()
        const response = await api.post('/api/tickets/')
            .send(helper.inValidTestTicket)
            .expect(400)
        const ticketsAtEnd = await helper.ticketsInDb()
        expect(ticketsAtEnd).toHaveLength(ticketsAtStart.length)
    })
})

describe('deletion of a ticket', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const ticketsAtStart = await helper.ticketsInDb()
        const response = await api.delete(`/api/tickets/${ticketsAtStart[0].id}`)
            .expect(204)
        const ticketsAtEnd = await helper.ticketsInDb()
        expect(ticketsAtEnd).toHaveLength(ticketsAtStart.length - 1)
    })
})

afterAll(async () => {
    mongoose.connection.close()
})