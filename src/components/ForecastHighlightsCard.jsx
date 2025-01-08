import React from "react";
import farenheitToCelsius from "../assets/functions/FarenheitToCelsius";
import { useCookies } from "react-cookie";

export default function ForecastHighlightsCard({date, icon, tempMin, tempMax}) {
    const [cookie] = useCookies(['temperatureFormat']);

    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const dateObject = new Date(dateString);
        return daysOfWeek[dateObject.getDay()];
    }

    return (
        <div className="forecast-highligts-card">
            <p> {getDayOfWeek(date)} </p>
            <img src={`${icon}.png`} alt="" />
            {cookie.temperatureFormat === 'celsius' && <span> <strong> {farenheitToCelsius(tempMax)}°C </strong> / {farenheitToCelsius(tempMin)}°C </span>} 
            {cookie.temperatureFormat !== 'celsius' && <span> <strong> {tempMax}°F </strong> / {tempMin}°F </span>} 
        </div>
    )
}