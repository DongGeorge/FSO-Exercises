import serverFunctions from './services/people'

const ContactEntry = ({person, persons, setPersons, setNotification, setIsError}) => {

	const handleNotification = (isError, message) => {
		setIsError(isError)
		setNotification(message)
		setTimeout(() => {
			setNotification('')
		}, 3000)
	}

  const handleDelete = event => {
	if (confirm(`Delete ${person.name}?`)) {
	  console.log(`Deleting ${person.name}`)
	  serverFunctions.deleteContact(person.id)
		.then( deletedContact => {
			setPersons(persons.filter(p => p.id !== deletedContact.id))
			handleNotification(false, `Information of ${person.name} was successfully deleted`)
		})
		.catch( error => {
			setPersons(persons.filter(p => p.id !== person.id))
			handleNotification(true, `Information of ${person.name} has already been removed from server`)
		})
	}
  }

  return (
	<div style={{display: "block"}}>
	  <p style={{display: "inline"}}>{person.name} {person.number}</p>
	  <button style={{display: "inline"}} onClick={handleDelete}>delete</button>
	</div>
  )
}

const Persons = ({persons, filter, setPersons, setNotification, setIsError}) => {
  const filteredContacts = filter === ''
	? persons
	: persons.filter(person => person.name.toLowerCase().startsWith(filter))

  // console.log(filteredContacts)

  return (
	<>
	  {filteredContacts.map(person => {
		return <ContactEntry
		  key={person.id}
		  person={person}
		  persons={persons}
		  setPersons={setPersons}
		  setNotification={setNotification}
		  setIsError={setIsError}
		/>
	  })}
	</>
  )
}

export default Persons