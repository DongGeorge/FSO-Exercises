import { useState } from 'react'

const StatisticLine = (props) => (<p>{props.text} {props.value}</p>)

const Statistics = ({good, neutral, bad}) => {
  const totalCount = good + neutral + bad

  const [goodWeight, neutralWeight, badWeight] = [1, 0, -1]

  const calculateAverage = () => {
    let score = goodWeight * good + neutralWeight * neutral + badWeight * bad
    return score / totalCount
  }

  const positivePercentage = () => good / totalCount

  if (totalCount > 0) {
    return (
      <>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>

        <StatisticLine text="all" value={totalCount}/>
        <StatisticLine text="average" value={calculateAverage()}/>
        <StatisticLine text="positive" value={positivePercentage()}/>
      </>
    )
  } else {
    return (
      <p>No feedback given</p>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App