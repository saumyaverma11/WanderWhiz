import { getWeatherForecast } from "../services/weather.service.js";

export const getCityWeather = async (req, res) => {
  try {
    const { city } = req.params;

    const weather = await getWeatherForecast(city);

    res.status(200).json({
      message: "Weather fetched successfully",
      weather,
    });

  } catch (error) {
    res.status(500).json({
      message: "Weather fetch failed",
      error: error.message,
    });
  }
};