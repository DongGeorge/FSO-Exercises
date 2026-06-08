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
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)

  const regularStyle = {
    color: 'green',
    border: 'solid',
    borderRadius: '0.5rem',
    backgroundColor: 'lightgray',
    fontSize: '2rem',
    padding: '1rem',
    margin: '0.5rem'
  }

  const Notification = () => {
    if (notification !== '') {
      return <div style={isError ? {...regularStyle, color: 'red'} : regularStyle}>{notification}</div>
    }
  }

  const synchWithServer = () => {
    serverFunctions.getAll().then(contacts => setPersons(contacts))
  }
  
  useEffect(synchWithServer, [])

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification />
        <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
        <PersonForm
          persons={persons} setPersons={setPersons}
          newName={newName} setNewName={setNewName}
          newNumber={newNumber} setNumber={setNumber}
          setNotification={setNotification} setIsError={setIsError}
        />
      <h2>Numbers</h2>
        <Persons
          persons={persons}
          filter={filter}
          setPersons={setPersons}
          setNotification={setNotification} setIsError={setIsError}
        />
    </div>
  )
}

export default App