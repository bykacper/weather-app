import React, { useRef } from "react";
import { useCookies } from "react-cookie";

export default function Header() {
    const todayPeriodRef = useRef(0);
    const weekPeriodRef = useRef(0);

    const celsiusRef = useRef(0);
    const farenheitRef = useRef(0);

    const [temperatureCookie, setTemperatureCookie] = useCookies(['temperatureFormat']);
    const [periodCookie, setPeriodCookie] = useCookies(['currentPeriod'])

    const toogle = (button, className, fRef, sRef, currPeriod) => {
        if(button.target.classList.contains(className))
            return 0;
        else {
            button.target.classList.add(className);

            if(button.target.innerHTML == sRef.current.innerHTML)
                fRef.current.classList.remove(className);
            else
                sRef.current.classList.remove(className);
        }

        if(currPeriod)
            setPeriodCookie('currentPeriod', currPeriod, { path: '/', maxAge: 3600 });
    }

    const toogleTemperatureFormat = (newFormat) => {
        setTemperatureCookie('temperatureFormat', newFormat, { path: '/', maxAge: 3600 });
    }

    return (
        <header>
            <div>
                <button className="period period-active" ref={todayPeriodRef} onClick={button => toogle(button, 'period-active', todayPeriodRef, weekPeriodRef, 'today')}> Today </button>
                <button className="period" ref={weekPeriodRef} onClick={button => toogle(button, 'period-active', todayPeriodRef, weekPeriodRef, 'week')}> Week </button>
            </div>
            <div>
                <button className="unit active-unit" ref={celsiusRef} onClick={button => {
                    toogle(button, 'active-unit', celsiusRef, farenheitRef, null);
                    toogleTemperatureFormat('celsius');
                    }}> °C </button>
                <button className="unit" ref={farenheitRef} onClick={button => {
                    toogle(button, 'active-unit', celsiusRef, farenheitRef, null);
                    toogleTemperatureFormat('farenheit');
                }}> °F </button>
            </div>
        </header>
    )
}