import axios from "axios"
import { useEffect, useState } from "react"

const CountryInfo = ({country}) => {
  const [weather, setWeather] = useState({
    temperature: '',
    icon: '',
    wind: '',
  })

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${API_KEY}`)
      .then((response) => {
        setWeather({
          temperature: response.data.main.temp,
          icon: response.data.weather[0].icon,
          wind: response.data.wind.speed
        })
      })
  }, [])

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map((language) => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img
        src={country.flags.png} 
        alt={country.flags.alt}
        width={150}
      />
      <h3>Weather in {country.capital}</h3>
      <div>temperature {(weather.temperature - 273.15).toFixed(2)} Celcius</div>
      {weather.icon && <img src={`https://openweathermap.org/img/wn/${weather.icon}.png`} alt="weather icon" width={80} />}
      <div>wind {weather.wind} m/s</div>
    </>
  )
}

export default CountryInfo