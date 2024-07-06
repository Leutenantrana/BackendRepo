require('dotenv').config()

const express = require('express')
const app = express();
const Note = require('./models/note')
const cors = require('cors')
app.use(express.json())

app.use(cors())

app.use(express.static('dist'))
let notes = []





app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.post('/api/notes', (req, res) => {
    const body = req.body;
    if (body.content === undefined) {
        return res.status(400).json({ error: "content missing" })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false
    })
    note.save().then(returnedNote => {
        res.json(note)
    })
})
app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.param.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {

    const id = Number(request.params.id);

    const note = notes
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();

});

const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => Number(n.id))) : 0

    return String(maxId + 1)

}

app.put('/api/notes/:id', (request, response) => {
    console.log("notes before change", notes)
    const body = request.body;
    const id = Number(request.params.id);

    if (!body.content) {
        return response.status(400).json({
            error: "content is missing"
        })
    }

    const notesss = body
    // console.log(`Initial note is`, note)
    // console.log("Note after change :", noteToChange)
    // console.log(typeof (note.id))
    notes.map(note => note.id !== id ? note : notesss)
    response.json(notesss)
    // console.log("notes after change", notes)



})
const port = 3011;
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})