import * as React from "react";
import "../styles/Main.css";
import  { useState, useEffect} from "react";
import axios from "axios";
import Geolocation from "./Geolocation";


import ReactWeather, { useOpenWeather } from 'react-open-weather';


let a:string = 'test2';



function Main() {

    const [city, setCity] = useState('Москва'); // отслеживаем изменение города
    const [lat, setLat] = useState(55.7522); // отслеживаем изменение текущих координат, по умолчанию - Москва
    const [lon, setLon] = useState(37.6156);

    // Функции вычисления текущей геопзиции
    function getMyPosition() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };
    function onSuccess(geolocationData) {
        setLat(geolocationData.coords.latitude);
        setLon(geolocationData.coords.longitude);
        axios.get(`https://api.ipgeolocation.io/timezone?apiKey=xxxxxxxxxxxxxxxxxxxxxx&lat=${lat}&lng=${lon}`).then(res => {
            setCity(res.data.geo.city);
        });


    };
    function onError(error) {
      console.log('Информация о местоположении недоступна');
      console.log(error.message);
    };


    // let getGeolocation = `https://api.ipgeolocation.io/timezone?apiKey=xxxxxxxxxxxxxxxxxxxxxxxx&lat=${lat}&lng=${lon}`;
    // axios.get(getGeolocation).then(res => {
    //         console.log(res);
    // })

    
//     const [appState, setAppState] = useState();
    // useEffect(() => {
    //   axios.get(getCauntries).then((resp) => {
    //     console.log('resp', resp)
    //     setAppState(resp.data);
    //   });
    // }, [setAppState]);

    // console.log('posts', appState)



    const citilist = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 
    'Челябинск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Омск', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'];

    // Наполняем содержимое select
    const options = citilist.map((text, index) => {
        return <option key={index}>{text}</option>;
    });


    // Получаем координаты выбранного города
    let getWeater = `http://api.openweathermap.org/geo/1.0/direct?q=${city}','RUS'&limit=1&appid=xxxxxxxxxxxxxxxxxxxxxxx`
    // let getWeater = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&exclude=minutely&units=metric&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`;
    axios.get(getWeater).then(res => {
            setLat(res.data[0].lat);
            setLon(res.data[0].lon);
    });

    console.log(lat, lon);


    // Настраиваем виджет на выбранный город
    let { data, isLoading, errorMessage } = useOpenWeather({
        // key: 'xxxxxxxxxxxxxxxxxxxxxx',
        key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        lat: lat,
        lon: lon,
        lang: 'ru',
        unit: 'metric',
    });

    return (
        <main>
            <div>

                <div className="weatherwidget">
                 <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="ru"
                    locationLabel={city}
                    unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                    showForecast={false}
                 />
                </div>
                <button className="btn" onClick={getMyPosition}>Найти меня</button>
                <select className='country' value={city} onChange={e=>setCity(e.target.value)}>
                    <option disabled>Выберите город</option>
                    {options}
                </select>

                <button>Погода сейчас</button>
                <button>На ближайшие два дня</button>
                <button>На этой неделе</button>
                <div id="openweathermap-widget-11"></div>

            </div>
        </main>
    );


}
export default Main;


