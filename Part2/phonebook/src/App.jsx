import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect, useState } from 'react'
import { getAll, create, deletePerson } from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getAll()
      .then(response => setPersons(response))
  }, [])
  

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const isPersonAdded = persons.some((person) => person.name === newName)
    if(isPersonAdded) {
      setNewName('')
      setNewNumber('')
      return alert(`${newName} is already added to phonebook`)
    }

    create({ name: newName, number: newNumber })
      .then(response => 
        setPersons(persons.concat(response.data))
      );
    
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id, name) => {
    if(confirm(`Delete ${name} ?`)) {
      deletePerson(id)
        .then(() => 
          getAll()
            .then((persons) => setPersons(persons))
        )
    }
  }

  const personsToDisplay = searchQuery === '' 
    ? persons 
    : persons.filter((person) => 
        person.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={searchQuery} 
        onChangeHandler={(event) => setSearchQuery(event.target.value)} 
      />
    
      <h2>Add a new</h2>
      <PersonForm 
        onSubmitHandler={addPerson} 
        name={newName} 
        number={newNumber}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={personsToDisplay} 
        deletePersonHandler={removePerson}
      />
    </div>
  )
}

export default App