import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [filter, setFilter] = useState('')
  const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
  let allCountries = null

  useEffect(() => {
    axios.get(`${countryUrl}/all`)
      .then(response => {
        console.log(response)
        allCountries = response.data
      })
      .catch(error => console.log('Communication with countries API failed'))
  }, [])

  return (
    <>
      <div>
        <p>find countries </p>
        <input value={filter} onChange={event => setFilter(event.target.value)}/>
      </div>
    </>
  )
}

export default App