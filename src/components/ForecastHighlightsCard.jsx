import React from "react";
import farenheitToCelsius from "../assets/functions/FarenheitToCelsius";
import { useCookies } from "react-cookie";

export default function ForecastHighlightsCard({date, icon, tempMin, tempMax, period, temp}) {
    const [cookie] = useCookies(['temperatureFormat']);

    const getDayOfWeek = (dateString) => {
        const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return daysOfWeek[new Date(dateString).getDay()];
    }

    return (
        <div className="forecast-highligts-card">
            {period == 'week' ? <p className="fh-card-date"> {getDayOfWeek(date)} </p>: <p className="fh-card-date"> {date} </p>}
            <img src={`${icon}.png`} alt="" />
            {!temp && cookie.temperatureFormat === 'celsius' && <span className="fh-card-temp"> <strong> {farenheitToCelsius(tempMax)}°C </strong> / {farenheitToCelsius(tempMin)}°C </span>} 
            {!temp && cookie.temperatureFormat !== 'celsius' && <span className="fh-card-temp"> <strong> {tempMax}°F </strong> / {tempMin}°F </span>} 
            {temp && cookie.temperatureFormat === 'celsius' && <span className="fh-card-temp"> <strong> {farenheitToCelsius(temp)}°C </strong> </span>}
            {temp && cookie.temperatureFormat !== 'celsius' && <span className="fh-card-temp"> <strong> {temp}°F </strong> </span>}
        </div>
    )
}

ForecastHighlightsCard.defaultProps = {
    period: "week",
    temp: false
}