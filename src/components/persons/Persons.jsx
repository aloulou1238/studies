import PersonsService from '../../services/persons'

const Persons = ({persons, filterText, filtered}) => {

  const handleDelete = ({name, id}) => {
    if(window.confirm(`Delete ${name}?`)){
      PersonsService
        .deletePerson(id)
        .then(response => {response.data})
        .catch(error => console.log(error))
    }
  }

return (
    <ul>
        {filterText === '' ? 
          persons.map((person, i) => 
            <li key={i}>{person.name} {person.number} 
            <button onClick={() => handleDelete(person)} style={{marginLeft: "10px"}}>Delete</button></li>
          ) 
          : 
          filtered.map((pers, id) => <li key={id}>{pers.name} {pers.number}</li>)
        }
      </ul>
  )
}

export default Persons