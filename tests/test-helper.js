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
    {
      name: 'Child Ticket',
      show: 'Movie D',
      price: 10.00,
      isAvailable: true,
    },
  ];

  module.exports = {tickets}