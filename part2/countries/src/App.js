import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({name}) => {
    const [country, setNewCountry] = useState({name: "", area: "", capital: "", flag: "", languages: []})

    useEffect(() => { 
        console.log('effect country')
        axios
            .get(`https://restcountries.com/v3/name/${name.toLowerCase()}`)
            .then(response => { 
                const countryObject = {
                    name: response.data[0].name.common,
                    capital: response.data[0].capital[0],
                    area: response.data[0].area,
                    flag: response.data[0].flags[0],
                    languages: Object.values(response.data[0].languages)
                }
                setNewCountry(countryObject)
                console.log(response.data[0])
            })
    }, [])
    console.log(country)

    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>Languages</h2>
            <h2>{country.languages[0]}</h2>
            <ul>
                {country.languages.map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flag} />
        </div>
    )
}

const Countries = ({countriesToShow}) => {
    console.log(countriesToShow.length)
    if (countriesToShow.length > 10) { 
        return ( 
            <div>
                mas especifico
            </div>
        )
    } else if (countriesToShow.length !== 1){ 
        return ( 
            <div>
                <ul>
                    {countriesToShow.map(country => 
                        <li key={country}>{country}</li>
                    )}
                </ul>
            </div>
        )
    } else { 
        return ( 
            <Country name={countriesToShow[0]} />
        )
    }

}

const App = () => {

    const [countries, setCountries] = useState([])
    const [newFilter, setNewFilter] = useState("")

    useEffect(() => { 
        console.log('effect')
        axios
            .get('https://restcountries.com/v3/all')
            .then(response => { 
                const countries = response.data.map(country => country.name.common)

                console.log('promise fulfilled')
                setCountries(countries)
            })
    }, [])
    console.log(countries)

    const handleFilterChange = (event) => { 
        setNewFilter(event.target.value)
        console.log(newFilter)
    }

    const countriesToShow =  countries.filter(country => country.includes(newFilter))

    return (
        <div>
            filter: <input value={newFilter} onChange={handleFilterChange} />
            <Countries countriesToShow={countriesToShow} />
        </div>
  );
}

export default App;
