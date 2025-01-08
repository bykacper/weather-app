import { useCookies } from "react-cookie";
import { WeatherProvider } from "./context/WeatherContext";
import TodayWeather from "./layouts/TodayWeather";
import WeatherHighligts from "./layouts/WeatherHighligts";
import { useEffect } from "react";

export default function App() {
  const [cookies, setCookies, removeCookies] = useCookies(['temperatureFormat']);

  useEffect(() => {
    setCookies('temperatureFormat', 'celsius', { path: '/', maxAge: 3600 });
  }, [])

  return (
    <WeatherProvider>
      <div className="weather-app-wrapper">
        <TodayWeather />
        <WeatherHighligts />
      </div>
    </WeatherProvider>
  );
}


