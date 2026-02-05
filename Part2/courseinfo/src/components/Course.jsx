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

export default Course