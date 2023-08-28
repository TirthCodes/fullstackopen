import Content from "./components/Content";
import Header from "./components/Header";
import Total from './components/Total';

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>

      <Content 
        part1={part1} 
        exercise1={exercises1} 
      />
    
      <Total 
        exercise1={exercises1} 
        exercise2={exercises2}
        exercise3={exercises3}
      />
    </div>
  )
}

export default App;