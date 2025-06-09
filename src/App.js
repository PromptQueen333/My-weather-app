import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const apiKey = "8539849456ab022cbbcd1ae846098241";

  // Fetch geolocation once when component mounts
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
        fetchWeatherByCity("New York"); // fallback city
      }
    );
  }, []);

  // Update body class when weather data changes
  useEffect(() => {
    if (weatherData) {
      const weatherMain = weatherData.weather[0].main.toLowerCase();
      document.body.className = ''; // reset
      document.body.classList.add(`weather-${weatherMain}`);
    }
  }, [weatherData]);

  // Fetch weather by coordinates
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

  // Fetch weather by city name (fallback)
  const fetchWeatherByCity = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
      );
      const result = await response.json();
      setWeatherData(result);
    } catch (error) {
      console.error("Error fetching fallback city weather:", error);
    }
  };
const backgroundStyle = {
    backgroundImage: "url('/images/blue-sky.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    color: 'white',
  };
  return (
    <div className="app-wrapper" style={backgroundStyle}>
      <div className={`container weather-${weatherData?.weather?.[0]?.main.toLowerCase() || ''}`}>
        {weatherData ? <Weather weatherData={weatherData} /> : <p>Loading weather...</p>}
      </div>
    </div>
  );
}

export default App;
