
const Persons = ({persons, deletePersonHandler}) => {

  return (
    <>
      {persons.map((person) => 
        <div key={person.id}>
          {person.name} {person.number} <span><button onClick={() => deletePersonHandler(person.id, person.name)}>delete</button></span>
        </div>
      )}
    </>
  )
}

export default Persons