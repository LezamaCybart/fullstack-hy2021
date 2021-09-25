import React, { useState } from "react";

const App = () => {
      const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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

        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
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
      <div>
        filter shown with:<input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <li key={person.id}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
