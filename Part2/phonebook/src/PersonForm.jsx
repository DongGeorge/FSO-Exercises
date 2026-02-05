import serverFunctions from './services/people'

const PersonForm = ({persons, setPersons, newName, setNewName, newNumber, setNumber, setNotification, setIsError}) => {
  const nameIsNotPresent = (name) => persons.find(element => element.name === name) === undefined

  const handleDuplicate = (contactName, number) => {
    const duplicateContact = persons.find(p => p.name === contactName)
    const newContact = {...duplicateContact, number }
    serverFunctions.updateContact(duplicateContact.id, newContact)
		.then( updated => {
			setPersons(persons.map(p => p.id === updated.id ? updated : p))
		})
		.catch( error => {
			setIsError(true)
			setNotification(`Information of ${newName} has already been removed from server`)
			setTimeout(() => {
				setNotification('')
			}, 3000)
			setPersons(persons.filter(p => p.id !== duplicateContact.id))
		})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(newName)

    if (nameIsNotPresent(newName)) {
      const newEntry = {
        name: newName,
        number: newNumber
      }
      serverFunctions.addContact(newEntry).then(updated => {
        setPersons(persons.concat(updated))
      })
    } else {
	  if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        handleDuplicate(newName, newNumber)
	  }
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

export default PersonForm