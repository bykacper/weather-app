import React, { useRef } from "react";
import { useCookies } from "react-cookie";

export default function Header() {
    const todayPeriodRef = useRef(0);
    const weekPeriodRef = useRef(0);

    const celsiusRef = useRef(0);
    const farenheitRef = useRef(0);

    const [cookies, setCookies, removeCookies] = useCookies(['temperatureFormat']);

    const toogle = (button, className, fRef, sRef) => {
        if(button.target.classList.contains(className))
            return 0;
        else {
            button.target.classList.add(className);

            if(button.target.innerHTML == sRef.current.innerHTML)
                fRef.current.classList.remove(className);
            else
                sRef.current.classList.remove(className);
        }
    }

    const toogleTemperatureFormat = (newFormat) => {
        setCookies('temperatureFormat', newFormat, { path: '/', maxAge: 3600 });
    }

    return (
        <header>
            <div>
                <button className="period" ref={todayPeriodRef} onClick={button => toogle(button, 'period-active', todayPeriodRef, weekPeriodRef)}> Today </button>
                <button className="period period-active" ref={weekPeriodRef} onClick={button => toogle(button, 'period-active', todayPeriodRef, weekPeriodRef)}> Week </button>
            </div>
            <div>
                <button className="unit active-unit" ref={celsiusRef} onClick={button => {
                    toogle(button, 'active-unit', celsiusRef, farenheitRef);
                    toogleTemperatureFormat('celsius');
                    }}> °C </button>
                <button className="unit" ref={farenheitRef} onClick={button => {
                    toogle(button, 'active-unit', celsiusRef, farenheitRef);
                    toogleTemperatureFormat('farenheit');
                }}> °F </button>
            </div>
        </header>
    )
}