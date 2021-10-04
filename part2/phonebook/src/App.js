import React, { useState, useEffect } from "react";
import axios from 'axios'
import PersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons"

const Notification = ({ message }) => { 

    const succesStyle = { 
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        boderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (message === null) { 
        return null
    }

    return ( 
        <div style={succesStyle}>
            {message}
        </div>
    )

}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newFilter, setNewFilter] = useState("");
    const [message, setMessage] = useState("")

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
            .get('http://localhost:3001/persons')
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
                    setMessage(`Updated ${personObject.name} information`)
                  setPersons(updatedPersons);
                  setNewName("");
                  setNewNumber("");
                    setTimeout(() => { 
                        setMessage(null)
                    }, 5000)
                })
        }

      //window.alert(`{newName} is already added to phonebook`)
    } else { 
        personService
            .create(personObject)
            .then(returnedPerson => { 
                    setMessage(`Added ${personObject.name}`)
                  setPersons(persons.concat(returnedPerson));
                  setNewName("");
                  setNewNumber("");
                    setTimeout(() => { 
                        setMessage(null)
                    }, 5000)
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
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} hand />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}  deletePersonFromState={deletePersonFromState}/>
    </div>
  );
};

export default App;
