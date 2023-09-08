import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect, useState } from 'react'
import { getAll, create, deletePerson, update } from './services/persons.js'

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

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const isPersonAdded = persons.find((person) => person.name === newName)
    
    if(isPersonAdded) {
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        update(isPersonAdded.id, newPerson)
          .then((response) => {
            setPersons(persons.map((person) => 
              person.id !== isPersonAdded.id 
                ? person 
                : response.data
            ))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        });
      
    }
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