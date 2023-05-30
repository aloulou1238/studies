import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonsForm from './PersonsForm'
import Persons from './Persons'
import PersonsService from '../../services/persons'
import Notification from './Notification'

const AppPersons = () => {

  

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    PersonsService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [persons])

  let filtered = persons.filter(person => person.name && person.name.toLowerCase().includes(filterText.toLowerCase()))

  const addPerson = (e) => {
    e.preventDefault()
    if(!newName && !newNumber){
      alert('Please fill the form')
      return
    }
    const foundName = persons.find((person) => person.name === newName)
    const foundNumber = persons.find((person) => person.number === newNumber)
    if (foundName && foundNumber) {
      alert(`${newName} already exists`)
    } else if (foundName && !foundNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))  { 
        const changedPerson = {...foundName, number: newNumber}
        PersonsService
          .updateNumber(foundName.id, changedPerson) 
          .then(returnedPerson => {
            setPersons(persons.map(person => foundName !== newName ? person : returnedPerson))
          })
          .catch(error => {
            setNotificationType('error')
            setNotificationMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000);
          })
      } 
      setNotificationType('success')
      setNotificationMessage(`${newName}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    } else {
      PersonsService
        .addPerson({name: newName, number: newNumber})
        .then(newPerson => setPersons(persons.concat(newPerson)))
      setNotificationType('success')
      setNotificationMessage(`${newName}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }

    setNewName('')
    setNewNumber('')
  }

  const filterNumbers = (e) => {
    setFilterText(e.target.value)
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notificationType} message={notificationMessage}/>
      <Filter filterNumbers={filterNumbers} filterText={filterText}/>
      <h2>Add a new</h2>
      <PersonsForm newName={newName} newNumber={newNumber} addPerson={addPerson} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} filtered={filtered}/>
    </div>
  )
}

export default AppPersons