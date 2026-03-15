// src/services/weather.service.js
import axios from "axios";

export const getWeatherForecast = async (city) => {
  try {
    console.log("Weather Key:", process.env.WEATHER_API_KEY);
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    const forecastList = response.data.list;

    // Take one forecast per day (every 8th record ≈ 24 hrs)
    const dailySummary = forecastList
      .filter((_, index) => index % 8 === 0)
      .slice(0, 5)
      .map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        condition: item.weather[0].description,
      }));

    return dailySummary;

  } catch (error) {
    console.log("Weather not available, skipping weather integration.");
    return []; // 🔥 Important: return empty array instead of throwing error
  }
};