const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    show: { type: String, required: true },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true },
})

ticketSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})


module.exports = mongoose.model('Ticket', ticketSchema)