import axios from "axios";
import React, { useEffect, useState } from "react";
import { WeatherModel } from "./WeatherModel";

const WeatherComponent: React.FC = () => {
    const [weather, setWeather] = useState<WeatherModel>({ Information: "" });

    useEffect(() => {
        axios.get<WeatherModel>("/getWeatherInformation").then((result) => {
            setWeather(result.data);
        });
    }, []);

    return <h1>Weather forecast tomorrow: {weather.Information}</h1>;
};

export default WeatherComponent;
