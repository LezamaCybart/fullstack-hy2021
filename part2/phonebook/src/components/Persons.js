import React from "react";
import personService from '../services/persons'

const Persons = ({ personsToShow, deletePersonFromState }) => {

    const firstTry = (id) => {
        personService
            .deletePerson(id)
            .then(deletedPerson => { 
                deletePersonFromState(id)
                console.log(id + "deleted")
            })
            
        console.log(id + "to deleted")
    }

    return (
        <ul>
            {personsToShow.map((person) => (
                <li key={person.id}>{person.name} {person.number}
                    <button onClick={() => firstTry(person.id)}>
                        erase
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Persons
