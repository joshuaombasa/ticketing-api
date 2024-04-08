const Ticket = require('../models/tecket')

const tickets = [
    {
        name: 'General Admission',
        show: 'Concert A',
        price: 25.99,
        isAvailable: true,
    },
    {
        name: 'VIP Pass',
        show: 'Concert B',
        price: 99.99,
        isAvailable: false,
    },
    {
        name: 'Student Ticket',
        show: 'Play C',
        price: 15.50,
        isAvailable: true,
    },
];

const ticketsInDb = async () => {
    const tickets = await Ticket.find({})
    const formattedTickets = tickets.map(t => t.toJSON())
    return formattedTickets
}

const nonExistentId = async () => {
    const ticketObject = new Ticket({
        name: 'Child Ticket',
        show: 'Movie D',
        price: 10.00,
        isAvailable: true,
    })

    const savedTicket = await ticketObject.save()
    await Ticket.findByIdAndDelete(savedTicket._id)
    return savedTicket._id.toString()
}

const validTestTicket = {
    name: 'Child Ticket',
    show: 'Movie D',
    price: 10.00,
    isAvailable: true,
}

const inValidTestTicket = {
    name: 'Child Ticket',
    isAvailable: true,
}

module.exports = { tickets, ticketsInDb, nonExistentId, validTestTicket, inValidTestTicket }