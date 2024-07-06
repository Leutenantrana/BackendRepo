// require('dotenv').config();
// const mongoose = require('mongoose')
// const url = process.env.MONGODB_URL;
// console.log(url)
// mongoose.set('strictQuery', false)
// mongoose.connect(url)
//     .then(() => {
//         console.log("Connection is made")
//     })
//     .catch((error) => {
//         console.log(error.message)
//     })
// const noteSchema = new mongoose.Schema({
//     content: String,
//     important: Boolean,
// })

// noteSchema.set("toJSON", {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })
// const Note = mongoose.model('Note', noteSchema)
// const note = new Note({
//     content: "NodeJs is relitively easier",
//     important: true,
// })

// // note.save().then(result => {
// //     console.log('note saved!')
// //     mongoose.connection.close()
// // })
// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)

//     })
//     mongoose.connection.close()
// })