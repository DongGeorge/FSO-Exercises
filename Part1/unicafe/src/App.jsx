import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalCount = good + neutral + bad

  const [goodWeight, neutralWeight, badWeight] = [1, 0, -1]

  const calculateAverage = () => {
    let score = goodWeight * good + neutralWeight * neutral + badWeight * bad
    return score / totalCount
  }

  const positivePercentage = () => good / totalCount * 100

  if (totalCount > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>

          <StatisticLine text="all" value={totalCount}/>
          <StatisticLine text="average" value={calculateAverage()}/>
          <StatisticLine text="positive" value={positivePercentage() + " %"}/>
        </tbody>
      </table>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const Button = (props) => (<button onClick={props.onClick}>{props.text}</button>)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App