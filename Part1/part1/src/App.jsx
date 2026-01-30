const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  // Renders name of course
  const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }

  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercise}
      </p>
    )
  }

  // Renders the parts and their number of exercies
  const Content = (props) => {
    return (
      <>
        <Part name={part1.name} exercise={part1.exercises}/>
        <Part name={part2.name} exercise={part2.exercises}/>
        <Part name={part3.name} exercise={part3.exercises}/>
      </>
    )
  }

  // Renders total number of exercises
  const Total = (props) => {
    return (
      <p>Number of exercises {props.count}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total count={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App