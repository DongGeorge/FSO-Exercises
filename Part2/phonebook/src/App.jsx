import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')

  const nameIsNotPresent = (name) => persons.find(element => element.name === name) === undefined

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newName)

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
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input />
        </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App