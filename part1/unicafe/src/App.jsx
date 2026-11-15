import { useState } from "react"

const StatisticLine = ({ text, value }) => {
  return <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
}
const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  return (
    <>


      <h1>statistics</h1>
      {all == 0 ? <h2>No feedback given</h2> :
        <table>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={(good - bad) / all} />
          <StatisticLine text={"positive"} value={((good) / all * 100) + "%"} />

        </table>
      }
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App