const mongoose = require('mongoose')
const notes = [];

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://ranasagar97411:${password}@cluster0.f8fqylv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false)

mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
    important: Boolean
})
const Person = mongoose.model('Person', personSchema)


const person = new Person({
    content: "NodeJs is relitively easier",
    important: true,
})

person.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})


// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//         notes.push(note)
//     })
//     mongoose.connection.close()


// })

console.log(notes)