import React, { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/UseFetch";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);
    const [key, setKey] = useState(import.meta.env.VITE_API_KEY);
    const { data, loading, error } = useFetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kielce?key=${key}`);

    useEffect(() => {
        if(data)
            setWeather(data);
    }, [data]);

    if(weather)
        return (
            <WeatherContext.Provider value={{ weather, setWeather }}>
                {children}
            </WeatherContext.Provider>
        );
    if(loading)
        return <h1> Loading... </h1>
    if(error)
        return <h1> Sorry, an error occurred.. </h1>
};

export default WeatherContext;
