import { useEffect, useState } from 'react'
import serverFunctions from './services/people'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

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
        <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  )
}

export default App