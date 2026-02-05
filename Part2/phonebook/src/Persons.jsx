import serverFunctions from './services/people'

const ContactEntry = ({person, persons, setPersons}) => {
  const handleDelete = event => {
	if (confirm(`Delete ${person.name}?`)) {
	  console.log(`Deleting {person.name}`)
	  serverFunctions.deleteContact(person.id).then( deletedContact => {
		setPersons(persons.filter(p => p.id !== deletedContact.id))
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

const Persons = ({persons, filter, setPersons}) => {
  const filteredContacts = filter === ''
	? persons
	: persons.filter(person => person.name.toLowerCase().startsWith(filter))

  // console.log(filteredContacts)

  return (
	<>
	  {filteredContacts.map(person => {
		return <ContactEntry
		  key={person.name}
		  person={person}
		  persons={persons}
		  setPersons={setPersons}
		/>
	  })}
	</>
  )
}

export default Persons