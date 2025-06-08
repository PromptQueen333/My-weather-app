console.log(weatherData.weather[0].icon, iconUrl);
// src/components/Weather.js
import React from "react";

export default function Weather({ weatherData }) {
  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div>
      <h2>{weatherData.name}</h2>
      <img src={iconUrl} alt={weatherData.weather[0].description} />
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°F</p>
    </div>
  );
}

