import { useEffect, useState } from "react"
import axios from "axios"

const SearchResult = ({ filteredCountries, showCountry }) => {

    const [weatherData, setWeatherData] = useState({})

    useEffect(() => {
        if (filteredCountries.length === 0) return

        const capital = filteredCountries[0].capital[0]
        if (!capital) return

        axios
            .get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: capital,
                    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
                },
            })
            .then(response => {
                setWeatherData(response.data)
                console.log(response.data)
            })
            .catch(error => console.error(error))

    }, [filteredCountries])

    if (filteredCountries.length == 1) {
        const icon = weatherData.weather?.[0]?.icon
        return <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital : {filteredCountries[0].capital[0]}</p>
            <p>Area : {filteredCountries[0].area}</p>
            <h3>Languages</h3>
            <ul>
                {
                    Object.values(filteredCountries[0].languages).map(lan => <li key={lan}>{lan}</li>)
                }
            </ul>
            <img src={filteredCountries[0].flags.svg} alt={`${filteredCountries[0].name.common} flag`} height="200px" width={"200px"} />

            <h2>Weather in {filteredCountries[0].capital[0]}</h2>
            <p>Temprature {weatherData.main.temp} celsius</p>


            {icon && (
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                />
            )}
            <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
    }
    else if (filteredCountries.length <= 10) {
        return (
            <>
                {
                    filteredCountries.map((country) => (
                        <div key={country.name.common}>
                            <span key={country.name.common}> {country.name.common}</span>
                            <button onClick={() => showCountry(country.name.common)}>show</button>
                        </div>
                    ))
                }
            </>
        )
    }
    else {
        return <p>Too  many matches, specify another filter</p>
    }
}

export default SearchResult