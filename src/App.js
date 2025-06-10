// src/App.js
import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "8539849456ab022cbbcd1ae846098241";

  // Get user location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.error("Geolocation error:", error);
        fetchWeatherByCity("New York"); // fallback
      }
    );
  }, []);

  // Fetch weather by coordinates
  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      );
      const data = await res.json();
      console.log("Weather data fetched:", data); // confirms it works
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  // Fallback fetch
  const fetchWeatherByCity = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
      );
      const data = await res.json();
      console.log("Fallback data fetched:", data);
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching city weather:", err);
    }
  };

  const backgroundStyle = {
    backgroundImage: "url('/images/blue-sky.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "2rem",
    borderRadius: '12px',
    color: "white",
  };

  return (
    <div className="app-wrapper" style={backgroundStyle}>
      {weatherData ? (
        <Weather weatherData={weatherData} />
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default App;
