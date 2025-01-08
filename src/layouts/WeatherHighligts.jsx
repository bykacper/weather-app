import React from "react";
import Header from "../components/Header";
import ForecastHighlights from "./ForecastHighlights";
import TodayHighlights from "../components/TodayHighlights";

export default function WeatherHighligts() {
    return (
        <div className="weather-highligts">
            <Header />
            <ForecastHighlights />
            <TodayHighlights />
        </div>
    )
}