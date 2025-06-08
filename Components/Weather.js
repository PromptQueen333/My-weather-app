// src/components/Weather.js
import React from "react";

export default function Weather({ weatherData }) {
  return (
    <div>
      <h2>{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°F</p>
    </div>
  );
}
