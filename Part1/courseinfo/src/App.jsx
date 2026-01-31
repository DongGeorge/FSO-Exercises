const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
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
    let parts = props.parts
    return (
      <>
        <Part name={parts[0].name} exercise={parts[0].exercises}/>
        <Part name={parts[1].name} exercise={parts[1].exercises}/>
        <Part name={parts[2].name} exercise={parts[2].exercises}/>
      </>
    )
  }

  // Renders total number of exercises
  const Total = (props) => {
    let parts = props.parts
    return (
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App