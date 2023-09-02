
const PersonForm = (props) => {

  const {
    onSubmitHandler,
    name,
    number,
    nameChangeHandler,
    numberChangeHandler
  } = props

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        name: <input value={name} onChange={nameChangeHandler} />
      </div>
      <div>
        number: <input value={number} onChange={numberChangeHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm