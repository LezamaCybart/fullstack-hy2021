import React, { useState, useEffect } from "react";
import axios from 'axios'
import PersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons"

const Notification = ({ message, success }) => {
  //const message = props[0]
  //const succes = props[1]
  console.log("notification" + message + success)
  //console.log("notification" + props)

  const succesStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    boderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const errorStyle = {
    ...succesStyle,
    color: 'red',
  }

  if (message === null) {
    return null
  }
  if (success) {
    return (
      <div style={succesStyle}>
        {message}
      </div>
    )

  } else {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState({ message: null, success: true })

  /*
  useEffect(() => { 
      console.log('useEffect')
      personService
          .getAll()
          .then(initialPersons => { 
              console.log(initialPersons)
              setPersons(initialPersons)
          })
          
  }, [])
  */

  useEffect(() => {
    console.log('useEffect')
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault();

    const names = persons.map(person => person.name)

    const personObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1
    };


    if (names.includes(personObject.name)) {
      if (window.confirm("Change number of existing contact?")) {
        const contact = persons.filter(person => person.name === personObject.name);
        const updatedPersons = persons.map(person => (person.name === contact[0].name) ? personObject : person)

        console.log(updatedPersons)

        personService
          .update(contact[0].id, personObject)
          .then(returnedPerson => {
            setMessage({ message: `Updated ${personObject.name} information`, success: true })
            setPersons(updatedPersons);
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setMessage({ message: null, success: true })
            }, 5000)
          })
          .catch(error => {
            setMessage({ message: `${personObject.name} was already deleted from server`, success: false })
            setNewName("");
            setNewNumber("");
            setPersons(persons.filter(person => person.name !== personObject.name))
          })
      }

      //window.alert(`{newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setMessage({ message: `Added ${personObject.name}`, success: true })
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setMessage({ message: null, success: "" })
          }, 5000)
        })
        .catch(error => {
          if (error.response.data.error === "name must be at least 3 char long and number must be at leas 8 long") {
            setMessage({ message: `name must have at least 3 char long and number must be at least 8 charactes long`, success: false })
          }
          console.log(error.response.data)
        })
    }

  };

  const deletePersonFromState = (id) => {
    setPersons(persons.filter(person => person.id !== id))
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    //setMessage()
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  //<Persons personsToShow={personsToShow} deletePersonFromState={deletePersonFromState}/>

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} success={message.success} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} hand />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePersonFromState={deletePersonFromState} />
    </div>
  );
};

export default App;
