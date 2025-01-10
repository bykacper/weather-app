import React, { useContext, useEffect, useState } from "react";
import ForecastHighlightsCard from "../components/ForecastHighlightsCard";
import WeatherContext from "../context/WeatherContext";
import { useCookies } from "react-cookie";

export default function ForecastHighlights() {
    const [cookies, setCookie] = useCookies(['currentPeriod']);
    const [weatherArray, setWeatherArray] = useState([]);
    const [currentPeriod, setCurrentPeriod] = useState(cookies.currentPeriod || 'week');
    const { weather } = useContext(WeatherContext);

    useEffect(() => {
        if (!cookies.currentPeriod) {
            setCookie('currentPeriod', 'week', { path: '/', maxAge: 3600 });
        }
    }, [cookies, setCookie]);

    useEffect(() => {
        if (currentPeriod == 'week' && weather && weather.days) {
            const weatherBox = [];
            for (let i = 0; i < 7; i++) {
                if (weather.days[i + 1]) {
                    weatherBox.push(weather.days[i]);
                }
            }
            setWeatherArray(weatherBox);
        } else if(currentPeriod == 'today' && weather) {
            let hour = new Date();
            const weatherBox = [];
            let numberOfDay = 0;
            let numberOfHour = hour.getHours();
            console.log(weather.days[numberOfDay].hours[23]);
            
            let i = 0;
            while(i < 7) {
                if(numberOfHour < 24) {
                    weatherBox.push(weather.days[numberOfDay].hours[numberOfHour]);
                    numberOfHour++;
                } else {
                     numberOfHour = 0;
                     numberOfDay++;
                     weatherBox.push(weather.days[numberOfDay].hours[numberOfHour]);
                }
                i++;
            }

            setWeatherArray(weatherBox);
        }
    }, [weather, currentPeriod]);

    useEffect(() => {
        setCurrentPeriod(cookies.currentPeriod);
    }, [cookies]);

    return (
        <div className="forecast-highligts">
        {currentPeriod == 'week' && weatherArray && weatherArray.map((weather) => (
            <ForecastHighlightsCard date={weather.datetime} icon={weather.icon} tempMin={weather.tempmin} tempMax={weather.tempmax}/>
        ))}
        {currentPeriod == 'today' && weatherArray && weatherArray.map((weather) => (
            <ForecastHighlightsCard date={weather.datetime} icon={weather.icon} period={'today'} temp={weather.temp}/>
        ))}
    </div>
    );
}
