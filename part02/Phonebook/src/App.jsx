import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import PersonsList from './components/PersonsList.jsx'
import phoneService from './phoneService.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({ message: "", type: "error" })

  useEffect(() => {
    phoneService.getAll().then(data => setPersons(data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()
    if (!name || !number) return

    if (persons.some((value) => value.name.toLowerCase() === name.toLowerCase())) {
      const existingPerson = persons.find(
        person => person.name.toLowerCase() === name.toLowerCase()
      )

      if (window.confirm(`${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        phoneService.updatePerson({ ...existingPerson, name, number })
          .then(updatedPerson => {
            setPersons(currentPersons =>
              currentPersons.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            )
            setNotificationMessage({ message: "Phone number updated", type: "success" })
            setTimeout(() => setNotificationMessage({ message: "", type: "success" }), 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(() => {
            setNotificationMessage({ message: "Failed to update person", type: "error" })
            setTimeout(() => setNotificationMessage({ message: "", type: "error" }), 5000)
          })
      }
      return
    }

    phoneService.addPerson({ name, number })
      .then(createdPerson => {
        setNotificationMessage({ message: "Person record added", type: "success" })
        setTimeout(() => setNotificationMessage({ message: "" }), 5000)
        setPersons(currentPersons => [...currentPersons, createdPerson])
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        const serverMessage = err.response?.data?.error
        setNotificationMessage({
          message: serverMessage || "Failed to add person",
          type: "error"
        })
        setTimeout(() => setNotificationMessage({ message: "", type: "error" }), 5000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const deletePerson = (id) => {
    const person = persons.find(currentPerson => currentPerson.id === id)

    if (!person || !window.confirm(`Delete ${person.name}?`)) return

    phoneService.deletePerson(id)
      .then(() => {
        setPersons(currentPersons =>
          currentPersons.filter(currentPerson => currentPerson.id !== id)
        )
      })
      .catch(() => {
        setNotificationMessage({ message: "Failed to deleted person", type: "error" })
        setTimeout(() => setNotificationMessage({ message: "" }), 5000)
      })
  }

  return (
    <div>
      <Notification message={notificationMessage.message} type={notificationMessage.type} />
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonsList filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App