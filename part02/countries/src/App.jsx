import { useState, useEffect } from 'react'
import SearchResult from './components/SearchResult.jsx'
import axios from "axios"

function App() {
  const [counties, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => setCountries(res.data))

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }
  const filteredCountries = counties.filter(country => {
    return country.name.common.toLowerCase().includes(search.toLowerCase()) && search.length
  })
  const showCountry = (name) => {
    setSearch(name)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        find countries <input onChange={handleSearchChange} value={search} />
      </form>
      <SearchResult filteredCountries={filteredCountries} showCountry={showCountry} />
    </>
  )
}

export default App
