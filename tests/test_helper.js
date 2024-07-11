const Note = require('../models/routes/note')
const User = require('../models/routes/user')


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
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}
module.exports = {
    initialNotes,
    nonExistingId,
    notesInDb,
    usersInDb
}