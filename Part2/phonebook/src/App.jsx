import { useEffect, useState } from 'react'
import axios from 'axios'
import serverFunctions from './services/people'

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

const Persons = ({persons, filter}) => {
  const filteredContacts = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(filter))

  // console.log(filteredContacts)

  return (
    <>
      {filteredContacts.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const synchWithServer = () => {
    serverFunctions.getAll().then(contacts => setPersons(contacts))
  }
  
  useEffect(synchWithServer, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
        <PersonForm
          persons={persons} setPersons={setPersons}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNumber={setNumber}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App