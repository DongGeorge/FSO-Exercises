import axios from 'axios'
import { useState, useEffect } from 'react'

const CountryItem = ({ setCountry, country }) => {
  return (
    <div>
      <p style={{display: 'inline'}}>{country.name.common} </p>
      <button onClick={() => setCountry(country)}>Show</button>
    </div>
  )
}

const CountryData = ({ filteredCountries }) => {
  const [chosenCountry, setCountry] = useState(null)
  // console.log(filteredCountries.length)

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0])
    } else {
      setCountry(null)
    }
  }, [filteredCountries])

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (chosenCountry) {
    // console.log(chosenCountry.name)
    return (
      <>
        <div>hi {chosenCountry.name.common}</div>
      </>
    )
  } else {
    return (
      <>
        {filteredCountries.map(country => <CountryItem setCountry={setCountry} country={country} key={country.name.common} />)}
      </>
    )
  }
}

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

  const filterCountries = (str) => {
    // console.log(`filter: ${str}`)
    setFilteredCountries(allCountries.filter(country => country.name.common.toLowerCase().includes(str)))
  }

  const handleFilter = event => {
    const newFilter = event.target.value
    setFilter(newFilter)
    filterCountries(newFilter)
  }

  return (
    <>
      <div>
        <p>find countries </p>
        <input value={filter} onChange={handleFilter}/>
        <CountryData filteredCountries={filteredCountries}/>
      </div>
    </>
  )
}

export default App