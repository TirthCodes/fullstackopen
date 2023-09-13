import { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [countryName, setCountryName] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState({
    show: false,
    selectedCountry: ''
  })

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  const countryChangeHandler = (event) => {
    setCountryName(event.target.value)
    setShowCountry({
      show: false,
      selectedCountry: ''
    })
  }

  const showCountryInfo = (country) => {
    setShowCountry({
      show: true,
      selectedCountry: country
    })
  }

  const countriesToDisplay = 
    countryName === '' 
      ? countries 
      : countries.filter((country) => 
          country.name.common.toLocaleLowerCase().includes(countryName.toLocaleLowerCase())
        )

  return (
    <>
      find countries <input value={countryName} onChange={countryChangeHandler} />
      {countriesToDisplay.length > 10 
        ? <div>Too many matches specify another filter</div>
        : 
        <>
          {countriesToDisplay.length === 1
            ?
            <CountryInfo country={countriesToDisplay[0]} />
            :
            <>
              {showCountry.show 
                ? <CountryInfo country={showCountry.selectedCountry} />
                :
                <>
                  {countriesToDisplay.map((country) => 
                    <div key={country.name.common}>{country.name.common} <button key={country.name.common} onClick={() => showCountryInfo(country)}>show</button> </div>
                  )}
                </>
              }
            </>
          }
          
        </>
      }
    </>
  )
}

export default App
