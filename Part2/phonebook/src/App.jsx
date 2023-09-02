import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const isPersonAdded = persons.some((person) => person.name === newName)
    if(isPersonAdded) {
      return alert(`${newName} is already added to phonebook`)
    }
    setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    setNewName('')
    setNewNumber('')
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
        onSubmitHandler={addName} 
        name={newName} 
        number={newNumber}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} />
    </div>
  )
}

export default App