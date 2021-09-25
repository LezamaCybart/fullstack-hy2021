import React from 'react'

//Part component
const Part = (props) => {
  return (
      <p>
        {props.name} {props.exercises}
      </p>
  )
}

//Header takes care of rendering the name of the course.
const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
}

//Content renders the parts and their number of exercises.
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

//Total renders the total number of exercises.
const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)

    const reducer = (previousValue, currentValue) => previousValue + currentValue;

    const total = exercises.reduce(reducer)

    return (
      <p>Number of exercises {total}</p>
    )
}

const Course = ({ course }) => { 
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
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
