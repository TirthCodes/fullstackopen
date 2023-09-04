import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response.data);
        setPersons(response.data)
      })
  }, [])
  

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