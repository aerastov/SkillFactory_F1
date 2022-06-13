import * as React from "react";
import  { useState } from "react";
import axios from "axios";

let getCauntries:string = 'https://restcountries.com/v3.1/all';
let getWeater:string = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=xxxxxxxxxxxxxxxxxxxxxxxxx';
let getGeolocation:string = 'https://api.ipgeolocation.io/timezone?apiKey=xxxxxxxxxxxxxxxxxxxxxxxxxxx&lat=${lat}&lng=${lng}';

function Geolocation() {
    let [lat, setLat] = useState(55.7522);
    let [lon, setLon] = useState(37.6156);

    getWeater = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&exclude=hourly,daily&units=metric&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
    axios.get(getWeater).then(res => {
            console.log(res);
            console.log(lat, lon)
    })



    function getMyPosition() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }



    function onSuccess(geolocationData) {
        setLat(geolocationData.coords.latitude);
        setLon(geolocationData.coords.longitude);
        getGeolocation = `https://api.ipgeolocation.io/timezone?apiKey=xxxxxxxxxxxxxxxxxxxxxxxx&lat=${lat}&lng=${lon}`;

    //     axios.get(getGeolocation).then(res => {
    //             console.log(res);
    //     })
        getWeater = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&exclude=minutely&units=metric&appid=xxxxxxxxxxxxxxxxxxxxx`;
        axios.get(getWeater).then(res => {
                console.log(res);
                console.log(lat, lon)
        })
    }

    function onError(error) {
      console.log('Информация о местоположении недоступна');
      console.log(error.message);
    }


    return (
        <button className="btn" onClick={getMyPosition}>Найти меня</button>

    );
}

export default Geolocation;

