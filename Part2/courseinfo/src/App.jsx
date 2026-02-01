const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Course = ({course}) => {
  const { id, name, parts } = course
  const courseElements = parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)
  const totalCount = parts.reduce(
    (total, currentPart) => total + currentPart.exercises,
    0
  )

  return (
    <>
      <h1>{name}</h1>
      {courseElements}
      <b>total of {totalCount} exercises</b>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App