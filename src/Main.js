import React, { useState } from "react";
import axios from "axios";

import WeatherDate from "./WeatherDate";
import "./App.css"
export default function Main() {
    const [city, setCity] = useState("");
    const [temp, setTemp] = useState("");
    const [metric, setMetric] = useState("celsius");
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
            name: response.data.name,
            temperature: response.data.main.temp,
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon
                }@2x.png`,
            description: response.data.weather[0].description,
            date: response.data.dt,
        });
        setTemp(response.data.main.temp);
    }

    function handleShowFahrenheit(event){
        event.preventDefault();
        setMetric("fahrenheit");
        setTemp((weather.temperature * 9/5) + 32);
    }

    function handleShowCelsius(event){
        event.preventDefault();
        setMetric("celsius");
        setTemp(weather.temperature);
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
                    <div className="details row ">
                        <div className="col-6 align-left">
                            <h1 id="city">{weather.name}</h1>
                            <p className="city-weather-details">
                                <WeatherDate data={weather.date} />
                                {"  "}
                                <span id="status">{weather.description}</span>
                                <br />
                                Humidity:
                                <strong>
                                    <span id="humidity">{weather.humidity}%</span>
                                </strong>
                                {", "}
                                Wind:
                                <strong>
                                    <span id="wind">{weather.wind}km/h</span>
                                </strong>
                            </p>
                        </div>

                        <div className="temp-details col-6 temperature-container d-flex justify-content-end mt-5">
                            <div id="icon">             <img src={weather.icon} alt={weather.description} />
                            </div>
                            <span id="temp">{Math.round(temp)}</span>
                            <span id="unit">
                                <a href="/" className={(metric === "celsius") ? "active" : "not-active"} onClick={handleShowCelsius}>°C</a> | <a href="/" className={(metric === "fahrenheit") ? "active" : "not-active"} onClick={handleShowFahrenheit}>°F</a></span>
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