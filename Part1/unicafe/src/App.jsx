import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <table>
      <tbody>  
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} /> 
        <StatisticLine text="bad" value={bad} /> 
        <StatisticLine text="all" value={good+neutral+bad} /> 
        <StatisticLine text="average" value={(good - bad)/(good+neutral+bad)} /> 
        <StatisticLine text="good" value={good} />
        <StatisticLine text="positive" value={`${good/(good+neutral+bad)*100}%`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1);
  const handleNeutralClick = () => setNeutral(neutral+1);
  const handleBadClick = () => setBad(bad+1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />      
      <Button handleClick={handleBadClick} text="bad" />      
      <h1>statistics</h1>
      {good+neutral+bad != 0 ? 
        <Statistics good={good} neutral={neutral} bad={bad}/>
        : <p>No feedback given</p>
      }
    </div>
  )
}

export default App