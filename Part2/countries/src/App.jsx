import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const countryChangeHandler = (event) => setCountryName(event.target.value)

  const countriesToDisplay = 
    countryName === '' 
      ? countries 
      : countries.filter((country) => 
          country.name.common.toLocaleLowerCase().includes(countryName.toLocaleLowerCase())
        )

  return (
    <>
      find countries <input value={countryName} onChange={countryChangeHandler} />
      {countriesToDisplay.length > 9 
        ? <div>Too many matches specify another filter</div>
        : 
        <>
          {countriesToDisplay.length === 1
            ?
            <>
              <h1>{countriesToDisplay[0].name.common}</h1>
              <div>capital {countriesToDisplay[0].capital}</div>
              <div>area {countriesToDisplay[0].area}</div>
              <p><strong>languages:</strong></p>
              <ul>
                {Object.values(countriesToDisplay[0].languages).map((language) => 
                  <li key={language}>{language}</li>
                )}
              </ul>
              <img
                src={countriesToDisplay[0].flags.png} 
                alt={countriesToDisplay[0].flags.alt}
                width={150}
              /> 
            </>
            :
            <>
              {countriesToDisplay.map((country) => 
                <div key={country.name.common}>{country.name.common}</div>
              )}
            </>
          }
        </>
      }
    </>
  )
}

export default App
