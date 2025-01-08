import React, { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/UseFetch";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);
    const { data, loading, error } = useFetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Kielce?key=BWG8YRTJN7H62WBGBKDARL9HL');

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
};

export default WeatherContext;
