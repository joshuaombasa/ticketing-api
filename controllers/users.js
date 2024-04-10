const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('json-web-token')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({})
        response.json(users)
    } catch (error) {
        next(error)
    }
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)
        if (!user) {
            return response.sendStatus(404)
        }
        response.json(user)
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { name, username, email, password, isAdmin } = request.body
    const passwordHash = await bcrypt.hash(password,10)
    const userObject = new User({ name, username, email, passwordHash, isAdmin })

    try {
        const savedUser = await userObject.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.put('/:id', async (request, response, next) => {
    const { name, username, email, passwordHash, isAdmin } = request.body
    try {
        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            { name, username, email, passwordHash, isAdmin },
            { new: true }
        )

        response.status(201).json(updatedUser)
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/:id', async (request, response, next) => {
    try {
        await User.findByIdAndDelete(request.params.id)
        response.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter