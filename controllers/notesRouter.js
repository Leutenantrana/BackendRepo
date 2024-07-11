const notesRouter = require('express').Router();
const Note = require('../models/routes/note')
const User = require('../models/routes/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace("Bearer ", "")

    }
    return null
}

notesRouter.get('/', async (request, response,) => {
    const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
    response.json(notes)
    // This is conventional way of handling asyncronous operations 
    // Note.find({})
    //     .then(notes => {
    //         response.json(notes)
    //     })
})
notesRouter.get('/:id', async (request, response, next) => {
    const { id } = request.params;
    if (!isValidObjectId(id)) {
        return response.status(400).send({ error: 'malformatted id' });
    }
    try {
        const note = await Note.findById(request.params.id)
        if (note) {
            response.json(note)
        } else {
            response.status(400).end()
        }
    } catch (error) {
        console.error(error)
        response.status(400).send({ error: 'malformatted id' });

    }
})
notesRouter.post('/', async (request, response, next) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(400).json({ error: "invalid token" })
    }


    const user = await User.findById(decodedToken.id)

    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
    })
    try {
        const savedNote = await note.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()
        response.status(201).json(savedNote)
    } catch (exception) {
        next(exception)
    }


})

notesRouter.delete('/:id', async (request, response, next) => {

    try {
        await Note.findByIdAndDelete(request.params.id)
        response.send(204).end()
    } catch (error) {
        console.error(error)
    }

})

notesRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter