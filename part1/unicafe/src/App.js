import React, { useState } from 'react'

const Button = ({handleClick, text}) => { 
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const StatisticLine = ({text, value}) => {
    if (text === 'positive') { 
        return ( 
            <p>{text} {value}%</p>
        )
    }
    return ( 
        <p>{text} {value}</p>
    )
}

const Statistics = ({good, neutral, bad}) => { 
    const all = good + neutral + bad
    const average = (good - bad) / all
    const positive = good / all * 100

    if (all === 0) { 
        return ( 
            <p>no feedback given</p>
        )
    }

    return ( 
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    const handleGood = () => setGood(good + 1)
    const handleNeutral = () => setNeutral(neutral + 1)
    const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

