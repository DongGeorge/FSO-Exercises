import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [allCountries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    axios.get(`${countryUrl}/all`)
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
      .catch(error => console.log('Communication with countries API failed'))
  }, [])

  const filterCountries = () => {
    return allCountries.filter(country => country.name.common.toLowerCase().includes(filter))
  }

  const handleFilter = event => {
    setFilter(event.target.value)
    setFilteredCountries(filterCountries())
    // console.log(filteredCountries)
  }

  return (
    <>
      <div>
        <p>find countries </p>
        <input value={filter} onChange={handleFilter}/>
      </div>
    </>
  )
}

export default App