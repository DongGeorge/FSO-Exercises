import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [counts, setCounts] = useState(Array(anecdotes.length).fill(0))

  const getRandomAnecdote = () => (Math.floor(Math.random() * anecdotes.length))
  const updateCountIdx = () => {
    const copy = [...counts]
    copy[selected] += 1
    setCounts(copy)
  }

  const getMostVoteAnecdote = () => {
    let mostIndex = 0
    let mostVote = 0
    for (let i = 0; i < counts.length; i++) {
      if (counts[i] > mostVote) {
        mostVote = counts[i]
        mostIndex = i
      }
    }
    return anecdotes[mostIndex]
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {counts[selected]} votes</div>
      <button onClick={updateCountIdx}>vote</button>
      <button onClick={() => setSelected(getRandomAnecdote())}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <div>{getMostVoteAnecdote()}</div>
    </>
  )
}

export default App