import React, { useContext, useEffect, useState } from "react";
import ForecastHighlightsCard from "../components/ForecastHighlightsCard";
import WeatherContext from "../context/WeatherContext";

export default function ForecastHighlights() {
    const [weatherArray, setWeatherArray] = useState([]);
    const { weather } = useContext(WeatherContext);

    useEffect(() => {
        if (weather && weather.days) {
            const weatherBox = [];
            for (let i = 0; i < 7; i++) {
                if (weather.days[i + 1]) {
                    weatherBox.push(weather.days[i]);
                }
            }
            setWeatherArray(weatherBox);
        }
    }, [weather]);

    return (
        <div className="forecast-highligts">
            {weatherArray && weatherArray.map((weather) => (
                <ForecastHighlightsCard date={weather.datetime} icon={weather.icon} tempMin={weather.tempmin} tempMax={weather.tempmax}/>
            ))}
        </div>
    );
}
