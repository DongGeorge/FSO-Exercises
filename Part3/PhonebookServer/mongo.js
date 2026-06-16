const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://donggeorge03_db_user:${password}@cluster0.xrj6g7m.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = new mongoose.model('contact', contactSchema)

const argCount = process.argv.length
if (argCount === 5) {
    // add new contact
    const name = process.argv[3], number = process.argv[4]
    const newContact = new Contact({
        name: name,
        number: number,
    })
    newContact.save().then(result => {
        console.log(`Added ${name} with phone ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (argCount === 3) {
    // display all contacts
    Contact.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}