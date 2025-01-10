import { useCookies } from "react-cookie";
import { WeatherProvider } from "./context/WeatherContext";
import TodayWeather from "./layouts/TodayWeather";
import WeatherHighligts from "./layouts/WeatherHighligts";
import { useEffect } from "react";

export default function App() {
  const [cookies, setCookies] = useCookies(['temperatureFormat', 'currentPeriod']);

  useEffect(() => {
    setCookies('temperatureFormat', 'celsius', { path: '/', maxAge: 3600 });
    setCookies('currentPeriod', 'today', { path: '/', maxAge: 3600 });

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


