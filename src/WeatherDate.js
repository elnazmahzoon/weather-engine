import React from "react";

import "./App.css";
export default function WeatherDate(props) {
    let date = new Date(props.data * 1000);

    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    let day = days[date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return (
        <div>
            <span id="day">{day} {hours}:{minutes} </span>
        </div>
    );
}