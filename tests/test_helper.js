const Note = require('../models/routes/note')

const initialNotes = [{
    content: "HTML is easy",
    important: false,
},
{
    content: "Browsers can execute JAvaScript only",
    important: true
},
]

const nonExistingId = async () => {
    const note = new Note({ content: "will delete soon" })
    await note.save();
    await note.deleteOne()
    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}
module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb
}