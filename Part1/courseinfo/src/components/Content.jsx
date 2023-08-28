import Part from './Part';

const Content = ({part1, part2, part3, exercise1, exercise2, exercise3}) => {
  return (
    <div>
      <Part part={part1} exersice={exercise1}/>
      <Part part={part2} exersice={exercise2}/>
      <Part part={part3} exersice={exercise3}/>
    </div>
  )
}

export default Content