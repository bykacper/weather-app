import React, { useContext, useEffect, useState } from "react";
import search from '../assets/images/search.png';
import WeatherContext from "../context/WeatherContext";
import farenheitToCelsius from "../assets/functions/FarenheitToCelsius";
import useFetch from "../hooks/UseFetch";
import { useCookies } from "react-cookie";

export default function GeneralWeather() {
    const { weather, setWeather } = useContext(WeatherContext);
    const [currentCity, setCurrentCity] = useState("");
    const [debouncedCity, setDebouncedCity] = useState("");
    const [cookies] = useCookies(['temperatureFormat']);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentCity) 
                setDebouncedCity(currentCity);
        }, 1500);

        return () => clearTimeout(timeout); 
    }, [currentCity]);

    useEffect(() => {
        if(weather)
            console.log(weather);
    }, [weather]);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!debouncedCity) return;

            try {
                const response = await fetch(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${debouncedCity}?key=BWG8YRTJN7H62WBGBKDARL9HL`
                );
                const data = await response.json();
                setWeather(data); 
            } catch (error) {
                console.error("Błąd podczas pobierania danych:", error);
            }
        };

        fetchWeather();
    }, [debouncedCity, setWeather]);

    return (
        <>
            {weather && (
                <>
                    <div className="general-weather">
                        <div className="gw-search-city">
                            <img src={search} alt="search" />
                            <input
                                type="text"
                                placeholder="Search for places..."
                                onChange={(item) => setCurrentCity(item.currentTarget.value)}
                            />
                        </div>
                        <img src={`${weather.currentConditions.icon}.png`} alt="sunny weather" />
                        { cookies.temperatureFormat === 'celsius' ? (
                            <h1>{farenheitToCelsius(weather.currentConditions.temp)}°C</h1>
                        ) : (
                            <h1>{weather.currentConditions.temp}°F</h1>
                        )}
                        <p>
                            <strong>{weather.address}</strong>, {weather.currentConditions.datetime}
                        </p>
                        <hr />
                        <p className="today-weather-description"> {weather.description} </p>
                    </div>
                </>
            )}
        </>
    );
}
