const mongoose = require('mongoose')

// const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connectingto to: ', url);
mongoose.connect(url)
.then(result => {
    console.log('connected to MondoDB');
})
.catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// const note = new Note({
//     content: 'personally made',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note created');
//     mongoose.connection.close()
// })

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     })
//     mongoose.connection.close()
// })

module.exports = mongoose.model('Note', noteSchema)