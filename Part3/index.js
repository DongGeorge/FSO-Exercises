const express = require('express')
const app = express()

app.use(express.json())

let info = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const idRange = Number.MAX_SAFE_INTEGER - 1

const getRandomId = () => {
	return Math.floor(Math.random() * idRange)
}

app.get('/api/persons', (req, res) => {
	res.json(info)
})

app.get('/api/persons/:id', (req, res) => {
	const contactId = req.params.id
	const contact = info.find(contact => contact.id === contactId)
	if (contact) {
		res.json(contact)
	} else {
		res.status(404).end()
	}
})

app.post('/api/persons', (req, res) => {
	const newContact = req.body
	console.log(newContact)

	if (!newContact || !newContact.name || !newContact.number) {
		res.status(400).json({
			error: "missing content; must contain both 'name' and 'number'"
		}).end()
		return
	}

	if (info.find(contact => contact.name === newContact.name)) {
		res.status(403).json({ error: 'name must be unique' }).end()
		return
	}

	const newInfo = {
		id: getRandomId().toString(),
		name: newContact.name,
		number: newContact.number
	}
	// console.log(newInfo)
	info = info.concat(newInfo)
	res.json(newInfo)
})

app.delete('/api/persons/:id', (req, res) => {
	const contactId = req.params.id
	info = info.filter(contact => contact.id !== contactId)
	res.status(204).end()
})

app.get('/info', (req, res) => {
	const timeReceived = new Date().toString()
	res.send(`<p>Phonebook has info for ${info.length} people</p>
<p>${timeReceived}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})