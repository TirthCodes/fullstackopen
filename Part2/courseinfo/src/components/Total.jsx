
const Total = ({parts}) => {
  return (
    <p><strong>total of {parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</strong></p>
  )
}

export default Total