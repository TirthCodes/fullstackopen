import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'
import { getAll, create, deletePerson, update } from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    color: ''
  })

  useEffect(() => {
    getAll()
      .then(response => setPersons(response))
      .catch((error) => {
        console.error(error)
        setNotificationMessage({
          message: "Failed to get Person's details from phonebook",
          color: "red"
        })
      })

    setTimeout(() => {
      setNotificationMessage({
        message: null,
        color: ''
      })
    }, 3000)
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
            setNotificationMessage({
              message: `Successfully updated the number of ${newName}`,
              color: "green"
            })
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            console.error(error)
            setNotificationMessage({
              message: `Failed to update the number of ${newName}`,
              color: "red"
            })
          })

        setTimeout(() => {
          setNotificationMessage({
            message: null,
            color: ''
          })
        }, 3000)
      }
    } else {
      create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data))
          setNotificationMessage({
            message: `Successfully added ${newName} to the phonebook`,
            color: "green"
          })
          setNewName('')
          setNewNumber('')
        })
        .catch((error) => {
          console.error(error)
          setNotificationMessage({
            message: `Failed to add ${newName} to the phonebook`,
            color: "red"
          })
        })

      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: ''
        })
      }, 3000)
    }
  }

  const removePerson = (id, name) => {
    if(confirm(`Delete ${name} ?`)) {
      deletePerson(id)
        .then(() => {
          setNotificationMessage({
            message: `Successfully deleted ${name} from phonebook`,
            color: "green"
          })
          getAll()
            .then((persons) => setPersons(persons))
        })
        .catch((error) => {
          console.error(error)
          setNotificationMessage({
            message: `Information of ${name} has already been removed from server`,
            color: "red"
          })
        })

      setTimeout(() => {
        setNotificationMessage({
          message: null,
          color: ''
        })
      }, 3000)
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
      <Notification notificationMessage={notificationMessage}  />
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