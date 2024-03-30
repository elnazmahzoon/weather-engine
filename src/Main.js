import React, { useState } from "react";
import axios from "axios";

import "./App.css"
export default function Main() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const [loaded, setLoaded] = useState(false);

    function updateCity(event) {
        setCity(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        let apiKey = "094780c710fa4efd669f0df8c3991927";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeather);
    }

    function displayWeather(response) {
        setLoaded(true);
        setWeather({
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon
                }@2x.png`,
            description: response.data.weather[0].description
        });
    }
    if (loaded) {
        return (
            <div>
                <header>
                    <form id="search-form">
                        <input type="text" placeholder="Enter a city.." id="form-input" onChange={updateCity} />
                        <input type="submit" value="Submit" id="form-submit" onClick={handleSubmit} />
                    </form>
                </header>
                <main>
                    <div className="details">
                        <div>
                            <h1 id="city">{city}</h1>
                            <p className="city-weather-details">
                                {/* <span id="day">Tuesday </span>
                            <span id="time">18:00</span> */}
                                {"  "}
                                <span id="status">{weather.description}</span>
                                <br />
                                Humidity:
                                <strong>
                                    <span id="humidity">{weather.humidity}%</span>
                                </strong>
                                {"  "}
                                Wind:
                                <strong>
                                    <span id="wind">{weather.wind}km/h</span>
                                </strong>
                            </p>
                        </div>

                        <div className="temp-details">
                            <div id="icon">             <img src={weather.icon} alt={weather.description} />
                            </div>
                            <span id="temp">{Math.round(weather.temperature)}</span>
                            <span id="unit">°C</span>
                        </div>
                    </div>
                    <div className="weather-forecast" id="forecast"></div>
                </main>
            </div>
        );
    } else {
        return (
        <header>
            <form id="search-form">
                <input type="text" placeholder="Enter a city.." id="form-input" onChange={updateCity} />
                <input type="submit" value="Submit" id="form-submit" onClick={handleSubmit} />
            </form>
        </header>
        );
    }
}