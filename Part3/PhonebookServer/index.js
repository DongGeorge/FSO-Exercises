const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let data = [
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

// console.log(data)

morgan.token('requestContent', function getBody (req) {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestContent'))

app.get('/api/persons', (req, res) => {
    console.log('GET request received')
    res.json(data)
})

// 3.2
app.get('/info', (req, res) => {
    const count = data.length
    const time = new Date().toString()
    const html = `<p>Phonebook has info for ${count} people</p><p>${time}</p>`
    res.send(html)
})

// 3.3
app.get('/api/persons/:id', (req, res) => {
    const target = req.params.id
    const resource = data.find(r => r.id === target)
    if (resource) {
        res.json(resource)
    } else {
        res.status(404).send('Resource not found')
    }
})

// 3.4
app.delete('/api/persons/:id', (req, res) => {
    const target = req.params.id
    const startingLength = data.length
    const deletedContact = data.find(d => d.id === target)
    data = data.filter(d => d.id !== target)
    if (data.length !== startingLength) {
        res.status(200).json(deletedContact)
    } else {
        res.status(404).send(`Resource '${target}' could not be found`)
    }
})

// 3.5
app.post('/api/persons', (req, res) => {
    // console.log(req.body)
    
    // 3.6 ----------
    const input = req.body
    const errors = []
    if (!input.name) errors.push('name')
    if (!input.number) errors.push('number')
    
    if (errors.length > 0) {
            return res.status(400).json({ error: "Missing keys", missingKeys: errors })
    }
    // 3.6 ------------
    
    const id = Math.ceil(Math.random() * 1_000_000_000).toString()
    const newEntry = { ...req.body, "id": id }
    data.push(newEntry)
    res.status(200).send(newEntry)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)

console.log(`App started on port ${PORT}`)
