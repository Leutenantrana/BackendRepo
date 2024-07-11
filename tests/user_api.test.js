const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/routes/user')
const { test, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe("when there is initially one user in the db", () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash("root", 10)
        const user = new User({ username: "root", passwordHash })
        const savedUser = await user.save()
        console.log(savedUser)
    })

    test('creation starts with a fresh username', async () => {
        const userAtStart = await helper.usersInDb();
        console.log(`users at start`, userAtStart)
        const newUser = {
            username: "root",
            name: "superuser",
            password: "password"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        console.log(usersAtEnd)
        assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message id username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})