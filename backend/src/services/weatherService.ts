import { getConditionsByDay } from './../models/weatherModel';
import fetch from "node-fetch";
import db from "../../db"; 
import logger  from "../logger"
import { WeatherResponse, mapToDbRecord } from "../types/weather";


const locationMap: Record<string, { lat: number; lng: number }> = {
  "sydney" : { lat: -33.740149, lng: 151.317036 }
};

export const getCoordinates = (location: string) => {
  const lowerCaseLocation = location.toLowerCase();
  return locationMap[lowerCaseLocation] || null; 
};

export const getWeatherData = async (location: string, date : Date) => {
  
  const coords = getCoordinates(location);
  const params = "cloudCover,waveHeight,airTemperature,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,waterTemperature,windDirection,windSpeed";
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing API Key for Stormglass");
  }

  try {
    
    logger.info("Attempting to get weather data from db");
    const existingData = getConditionsByDay(location, date);

    if (existingData) {
      logger.info(`✅ Returning cached data for ${location}`);
      return existingData; 
    }

    logger.info(`🌊 Fetching new data for ${location}`);
    const response = await fetch(
      `https://api.stormglass.io/v2/weather/point?lat=${coords.lat}&lng=${coords.lng}&params=${params}`,
      {
        method: "GET",
        headers: { Authorization: apiKey },
      }
    );

    const data = await response.json() as WeatherResponse;

    const weatherData = data.hours.map((hour) => ({
      location,
      latitude: coords.lat,
      longitude: coords.lng,
      forecast_time: new Date(hour.time),
      ...mapToDbRecord(hour),
    }));

    await db("weather_forecast").insert(weatherData);

    return getConditionsByDay(location, date);

  } catch (error) {
    console.error("Error fetching real-time conditions:", error);
    throw error;
  }
};