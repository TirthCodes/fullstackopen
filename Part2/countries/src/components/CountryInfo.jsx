
const CountryInfo = ({country}) => {
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
    </>
  )
}

export default CountryInfo