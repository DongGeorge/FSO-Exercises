import { useState } from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={(event) => setFilter(event.target.value)}/>
    </div>
  )
}

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNumber}) => {
  const nameIsNotPresent = (name) => persons.find(element => element.name === name) === undefined

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(newName)

    if (nameIsNotPresent(newName)) {
      const newEntry = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newEntry))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNumber('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredContacts = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(filter))

  // console.log(filteredContacts)

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
        <PersonForm
          persons={persons} setPersons={setPersons}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNumber={setNumber}
        />
      <h2>Numbers</h2>
      {filteredContacts.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App