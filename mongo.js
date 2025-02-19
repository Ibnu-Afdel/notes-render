const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('you forgot passowrd');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mongo-bilal:${password}@cluster0.kv67n.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'personally made',
//     important: true,
// })

// note.save().then(result => {
//     console.log('note created');
//     mongoose.connection.close()
// })

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note);
    })
    mongoose.connection.close()
})