import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import './App.css';



function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const apiKey = "8539849456ab022cbbcd1ae846098241";

useEffect(() => {
  if (weatherData) {
    const weatherMain = weatherData.weather[0].main.toLowerCase(); // e.g. "clear", "clouds"
    document.body.className = ''; // reset class
    document.body.classList.add(`weather-${weatherMain}`);
  }
}, [weatherData]);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setLat(latitude);
      setLong(longitude);

      fetchWeather(latitude, longitude);
    },
    (error) => {
      console.error("Geolocation error:", error);
      fetchWeatherByCity("New York");
    }
  );
}, []);

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
      );
      const result = await response.json();
      setWeatherData(result);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fetchWeatherByCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
      );
      const result = await response.json();
      setWeatherData(result);
    } catch (error) {
      console.error("Error fetching weather for fallback city:", error);

    }
  };

  return (

  <div className="app-wrapper">
    <div className={`container weather-${weatherData && weatherData.weather ? weatherData.weather[0].main.toLowerCase() : ''}`}>
      {weatherData ? <Weather weatherData={weatherData} /> : <p>Loading weather...</p>}
    </div>
  </div>
  );
}

export default App;
