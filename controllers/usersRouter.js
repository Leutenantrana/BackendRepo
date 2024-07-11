const mongoose = require('mongoose')
const User = require('../models/routes/user')
const userRouter = require("express").Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', { content: 1, important: 1 })
    response.json(users)
})
userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    const saltValue = 10;
    try {
        const passwordHash = await bcrypt.hash(password, saltValue)
        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        response.status(400)
    }

})

module.exports = userRouter