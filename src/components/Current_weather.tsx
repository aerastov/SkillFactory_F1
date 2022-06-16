import * as React from "react";
import  { useState } from "react";
import axios from "axios";
import "../styles/Widget.css";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

function Current(props) {
    // Настраиваем виджет на выбранный город
    let { data, isLoading, errorMessage } = useOpenWeather({
        key: props.key1,
        lat: props.lat,
        lon: props.lon,
        lang: 'ru',
        unit: 'metric',
    });

    return (
        <div className="weatherwidget">
            <ReactWeather
            isLoading={isLoading}
            errorMessage={errorMessage}
            data={data}
            lang="ru"
            locationLabel={props.city}
            unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
            showForecast={false}
            />
        </div>
    );
};

export default Current;

