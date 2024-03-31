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
        let apiKey = "d2fa3o5d84e8f709eat4a9eb65972bf2";
        let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
        axios.get(apiUrl).then(displayWeather);
    }

    function displayWeather(response) {
        setLoaded(true);
        setWeather({
            name: response.data.city,
            temperature: response.data.daily[0].temperature.day,
            wind: response.data.daily[0].wind.speed,
            humidity: response.data.daily[0].temperature.humidity,
            icon: response.data.daily[0].condition.icon_url,
            description: response.data.daily[0].condition.description,
            date: response.data.daily[0].time,
            forecast: response.data.daily,
        });
        setTemp(response.data.daily[0].temperature.day);
    }

    function handleShowFahrenheit(event) {
        event.preventDefault();
        setMetric("fahrenheit");
        setTemp((weather.temperature * 9 / 5) + 32);
    }

    function handleShowCelsius(event) {
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
                    <div className="weather-forecast" id="forecast">
                        {
                            weather.forecast.map(function (day, index) {
                                if (index > 0 && index < 6) {
                                    let date = new Date(day.time * 1000);
                                    let days = [
                                        'Sunday',
                                        'Monday',
                                        'Tuesday',
                                        'Wednesday',
                                        'Thursday',
                                        'Friday',
                                        'Saturday',
                                    ];
                                    let dayName = days[date.getDay()];
                                    return (
                                        <div key={index}>
                                            <div>{dayName}</div>
                                            <img src={day.condition.icon_url} alt="" />
                                            <div className="weather-forecast-temperatures">
                                                <span className="weather-forecast-temperature">{Math.round(day.temperature.maximum)}°</span>
                                                <span className="weather-forecast-temperature">{Math.round(day.temperature.minimum)}°</span>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
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