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
      <h2>{name}</h2>
      {courseElements}
      <b>total of {totalCount} exercises</b>
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} key={course.id}/>)}
    </>
  )
}

export default App