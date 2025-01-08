import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import windIcon from '../assets/images/wind.png'
import sunriseIcon from '../assets/images/sunrise.png';
import sunsetIcon from '../assets/images/sunset.png'

export default function TodayHighlights() {
    return (
        <div className="todays-highlights">
            <h1> Today's Highlights </h1>
            <div className="th-cards">
                <EmptyCard />
                <WindStatus />
                <SunriseAndSunset />
                <EmptyCard />
                <Visibility />
                <CloudyStatus />
            </div>
        </div>
    )
}

function WindStatus() {
    const { weather, setWeather } = useContext(WeatherContext); 

    const getWindDirection = (degrees) => {
        if (degrees >= 0 && degrees <= 22.5) return "N";
        if (degrees > 22.5 && degrees <= 67.5) return "NE";
        if (degrees > 67.5 && degrees <= 112.5) return "E";
        if (degrees > 112.5 && degrees <= 157.5) return "SE";
        if (degrees > 157.5 && degrees <= 202.5) return "S";
        if (degrees > 202.5 && degrees <= 247.5) return "SW";
        if (degrees > 247.5 && degrees <= 292.5) return "W";
        if (degrees > 292.5 && degrees <= 337.5) return "NW";
        if (degrees > 337.5 && degrees <= 360) return "N";
    }

    return (
        <div className="th-card">
            <h2> Wind status </h2>
            <h1> {weather.currentConditions.windspeed} km/h </h1>
            <div className="wind-direction">
                <img src={windIcon} alt="wind" className="wind-icon"/>
                <p> {getWindDirection(weather.currentConditions.winddir)} </p>
            </div>
        </div>
    )
}

function SunriseAndSunset() {
    const { weather, setWeather } = useContext(WeatherContext); 

    return (
        <div className="th-card sunrise-and-sunset">
            <h2> Sunrise & Sunset </h2>
            <div>
                <img src={sunriseIcon} alt="sunrise icon" className="sunrise-icon" />
                <p> {weather.currentConditions.sunrise} </p>
            </div>
            <div>
                <img src={sunsetIcon} alt="sunset icon" className="sunset-icon" />
                <p> {weather.currentConditions.sunset} </p>

            </div>
            
        </div>
    )
}

function CloudyStatus() {
    const { weather, setWeather } = useContext(WeatherContext); 

    return (
        <div className="th-card">
            <h2> Cloudy Status </h2>
            <h1> {weather.currentConditions.cloudcover}% </h1>
        </div>
    )
}

function Visibility() {
    const { weather, setWeather } = useContext(WeatherContext); 

    return (
        <div className="th-card">
            <h2> Visibility </h2>
            <h1> {weather.currentConditions.visibility} km </h1>
            {weather.currentConditions.visibility<=1 && (
                <span> Very weak 😡 </span>
            )}
            {weather.currentConditions.visibility>1 && weather.currentConditions.visibilit<=5 && (
                <span> Weak 😬 </span>
            )}
            {weather.currentConditions.visibility>5 && weather.currentConditions.visibility<=10 && (
                <span> Moderate 😒 </span>
            )}
            {weather.currentConditions.visibility>10 && weather.currentConditions.visibility<=15 && (
                <span> Good 🙂 </span>
            )}
            {weather.currentConditions.visibility>15 && weather.currentConditions.visibility<=20 && (
                <span> Very good 😄 </span>
            )}
        </div>
    )
}

function EmptyCard() {
    return (
        <div className="th-card">
            <h2> Empty slot </h2>
        </div>
    )
}