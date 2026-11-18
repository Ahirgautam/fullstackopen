import { useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 9090999999 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newName == "" || newNumber == "") return;

    if (persons.some((value) => value.name == newName)) {
      alert(newName + " is already added to phonebook")
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName("")
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }


  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      {
        filteredPersons.map((person) => (<p key={person.name}>{person.name} {person.number}</p>))
      }
    </div>

  )
}

export default App