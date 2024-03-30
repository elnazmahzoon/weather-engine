import React, { useState } from "react";

import "./App.css"
export default function Main() {
    return (
        <div>
            <header>
                <form id="search-form">
                    <input type="text" placeholder="Enter a city.." id="form-input" />
                    <input type="submit" value="Submit" id="form-submit" />
                </form>
            </header>
            <main>
                <div className="details">
                    <div>
                        <h1 id="city">Sydney</h1>
                        <p className="city-weather-details">
                            <span id="day">Tuesday </span>
                            <span id="time">18:00</span>
                            {"  "}
                            <span id="status">Rainy</span>
                            <br />
                            Humidity:
                            <strong>
                                <span id="humidity">80%</span>
                            </strong>
                            {"  "}
                            Wind:
                            <strong>
                                <span id="wind">4km/h</span>
                            </strong>
                        </p>
                    </div>

                    <div className="temp-details">
                        <div id="icon"></div>
                        <span id="temp">18</span>
                        <span id="unit">°C</span>
                    </div>
                </div>
                <div className="weather-forecast" id="forecast"></div>
            </main>
        </div>
    );
}