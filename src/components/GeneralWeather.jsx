import React, { useContext, useEffect, useState } from "react";
import search from '../assets/images/search.png';
import locationPin from '../assets/images/location-pin.png';
import WeatherContext from "../context/WeatherContext";
import farenheitToCelsius from "../assets/functions/FarenheitToCelsius";
import { useCookies } from "react-cookie";
import useFetch from "../hooks/UseFetch";

export default function GeneralWeather() {
    const { weather, setWeather } = useContext(WeatherContext);
    const [currentCity, setCurrentCity] = useState("");
    const [debouncedCity, setDebouncedCity] = useState("");
    const [cookies] = useCookies(['temperatureFormat']);
    const [key] = useState(import.meta.env.VITE_API_KEY);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentCity) setDebouncedCity(currentCity);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [currentCity]);

    const { data: newWeather, loading, error } = useFetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${debouncedCity || "Kielce"}?key=${key}`
    );

    useEffect(() => {
        if (newWeather) {
            setWeather(newWeather);
        }
    }, [newWeather, setWeather]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <>
            {weather && (
                <div className="general-weather">
                    <div className="gw-search-city">
                        <img src={search} alt="search" className="search-icon"/>
                        <img src={locationPin} alt="location pin" className="location-pin"/>
                        <input
                            type="text"
                            placeholder="Search for places..."
                            defaultValue={"Kielce"}
                            onChange={(item) => setCurrentCity(item.currentTarget.value)}
                        />
                    </div>
                    <img src={`${weather.currentConditions.icon}.png`} alt="weather icon" className="weather-icon"/>
                    {cookies.temperatureFormat === 'celsius' ? (
                        <h1 className="temp">{farenheitToCelsius(weather.currentConditions.temp)}°C</h1>
                    ) : (
                        <h1 className="temp">{weather.currentConditions.temp}°F</h1>
                    )}
                    <p className="addressAndDate">
                        <strong>{weather.address}</strong>, {weather.currentConditions.datetime}
                    </p>
                    <hr />
                    <p className="today-weather-description"> {weather.description} </p>
                </div>
            )}
        </>
    );
}
