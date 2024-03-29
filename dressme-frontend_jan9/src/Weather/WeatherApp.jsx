
import "./Sample.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WeatherApp.css';
import SearchCities from './SearchCities';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import Checkweather from './Checkweather';


const WeatherApp = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [forecast, setForecast] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`https://api.openweathermap.org/data/2.5//weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result);
                });
        }
        fetchData();
    }, [lat, long])



    const API_KEY = 'a688741f33e47bad9c43af22565b8b95';

    const search = async (e) => {
        if (e.key === 'Enter') {
            try {
                const { data } = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
                );
                setWeather(data);

                const forecastData = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}&units=metric`
                );
                setForecast(forecastData.data.list);
                setQuery('');
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
    };

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(
            `https://api.openweathermap.org/data/2.5//weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const forecastFetch = fetch(
            `https://api.openweathermap.org/data/2.5//forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forcastResponse = await response[1].json();

                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setForecast({ city: searchData.label, ...forcastResponse });
            })
            .catch(console.log);
    };



    return (
        <div class="backimage">
            <div class="container">
                <div class="row"><div className='col-md-6 '>
                    <div class="weather__header">
                        <form class="weather__search">
                            <br />&nbsp;
                        </form>
                        <div class="weather__units">
                            <span class="weather_unit_celsius"></span>
                            <span class="weather_unit_farenheit"></span>
                        </div>
                    </div>
                    {(typeof data.main != 'undefined') ?
                        <div class="weather__body">
                            <h1 class="weather__city"><b> {data.name} , {data.sys.country} </b></h1>

                            <Checkweather></Checkweather>
                        </div> :
                        <div>Loading...</div>
                    }



                </div>

                    <div className='col-md-6 '>
                        <div class="weather__header ">
                            <form class="weather__search ">

                            </form>

                            <div class="weather__units">
                                <SearchCities onSearchChange={handleOnSearchChange} />
                                {currentWeather && (


                                    <CurrentWeather data={currentWeather} />

                                )}

                            </div>
                        </div>


                    </div>

                </div>
                <div class="row">
                  <div class="col-md-8"><br/><br/>
                    Forecast
                  </div>
                </div>

            </div></div>
    );
}
export default WeatherApp;