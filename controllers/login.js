const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')
require('dotenv').config()

loginRouter.post('/', async (request, response, next) => {
    const { username, password } = request.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return response.status(401).json({ error: 'invalid credentails' })
        }
        const passwordMatch = await bcrypt.compare(password, user.passwordHash)

        if (!passwordMatch) {
            return response.status(401).json({ error: 'invalid credentails' })
        }

        const userObjectForToken = {
            username: user.username,
            email: user.email,
            id: user._id.toString(),
        }

        const token = jwt.sign(userObjectForToken, process.env.SECRET, { validFor: 60 * 60 })

        response.status(201).json({ token, userObjectForToken })
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter