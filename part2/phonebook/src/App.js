import React, { useState, useEffect } from "react";
import axios from 'axios'
import PersonForm from "./components/AddPersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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
      id: persons.length + 1
    };


    if (names.includes(personObject.name)) {
      window.alert(`{newName} is already added to phonebook`)
    } else { 
        axios
            .post('http://localhost:3001/persons', personObject)
            .then(response => { 
                  setPersons(persons.concat(response.data));
                  setNewName("");
                  setNewNumber("");
            })
    }

  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }


  const personsToShow = persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} hand />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  );
};

export default App;
