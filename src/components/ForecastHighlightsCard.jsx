import React from "react";
import farenheitToCelsius from "../assets/functions/FarenheitToCelsius";
import { useCookies } from "react-cookie";

export default function ForecastHighlightsCard({date, icon, tempMin, tempMax, period, temp}) {
    const [cookie] = useCookies(['temperatureFormat']);

    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const dateObject = new Date(dateString);
        return daysOfWeek[dateObject.getDay()];
    }

    return (
        <div className="forecast-highligts-card">
            {period == 'week' ? <p> {getDayOfWeek(date)} </p>: <p> {date} </p>}
            <img src={`${icon}.png`} alt="" />
            {!temp && cookie.temperatureFormat === 'celsius' && <span> <strong> {farenheitToCelsius(tempMax)}°C </strong> / {farenheitToCelsius(tempMin)}°C </span>} 
            {!temp && cookie.temperatureFormat !== 'celsius' && <span> <strong> {tempMax}°F </strong> / {tempMin}°F </span>} 
            {temp && cookie.temperatureFormat === 'celsius' && <span> <strong> {farenheitToCelsius(temp)}°C </strong> </span>}
            {temp && cookie.temperatureFormat !== 'celsius' && <span> <strong> {temp}°F </strong> </span>}
        </div>
    )
}

ForecastHighlightsCard.defaultProps = {
    period: "week",
    temp: false
}