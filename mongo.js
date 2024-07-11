require('dotenv').config();
const mongoose = require('mongoose');

// Use your connection string with proper security practices (e.g., storing credentials in environment variables)
const url = process.env.TEST_MONGODB_URI || "mongodb+srv://ranasagar97411:ranasagar97411@cluster0.f8fqylv.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0";

console.log(url);

const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
};

const main = async () => {
    await connectDb();

    const noteSchema = new mongoose.Schema({
        content: String,
        important: Boolean,
    });

    noteSchema.set("toJSON", {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    });

    const Note = mongoose.model('Note', noteSchema);

    const note = new Note({
        content: "NodeJs is relatively easier",
        important: true,
    });

    try {
        const result = await note.save();
        console.log('note saved!', result);

        const notes = await Note.find({});
        notes.forEach(note => {
            console.log(note);
        });
    } catch (error) {
        console.log(error.message);
    } finally {
        mongoose.connection.close();
    }
};

main();