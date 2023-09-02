import Part from './Part';

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part key={part.id} part={part.name} exersice={part.exercises} />
      })}
    </div>
  )
}

export default Content