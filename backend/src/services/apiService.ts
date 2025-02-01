import fetch from "node-fetch";
import db from "../../db"; 
import logger  from "../logger"
import { WeatherResponse } from "../types/weather";


const locationMap: Record<string, { lat: number; lng: number }> = {
  "sydney" : { lat: -33.740149, lng: 151.317036 }
};

export const getCoordinates = (location: string) => {
  const lowerCaseLocation = location.toLowerCase();
  return locationMap[lowerCaseLocation] || null; 
};

export const getRealTimeConditions = async (location: string) => {
  
  const coords = getCoordinates(location);
  const params = "cloudCover,waveHeight,airTemperature,swellDirection,swellHeight,swellPeriod,secondarySwellPeriod,secondarySwellDirection,secondarySwellHeight,waterTemperature,windDirection,windSpeed";
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing API Key for Stormglass");
  }

  try {
    
    logger.info("Attempting to get weather data from db");
    const existingData = await db("weather_forecast")
      .where("location", location)
      //.andWhere("date", new Date().toISOString().split("T")[0]) 
      .first();

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
      air_temperature: hour.airTemperature.sg ?? null,
      cloud_cover: hour.cloudCover.sg ?? null,
      secondary_swell_direction: hour.secondarySwellDirection.sg ?? null,
      secondary_swell_height: hour.secondarySwellHeight.sg ?? null,
      secondary_swell_period: hour.secondarySwellPeriod.sg ?? null,
      swell_direction: hour.swellDirection.sg ?? null,
      swell_height: hour.swellHeight.sg ?? null,
      swell_period: hour.swellPeriod.sg ?? null,
      water_temperature: hour.waterTemperature.sg ?? null,
      wave_height: hour.waveHeight.sg ?? null,
      wind_direction: hour.windDirection.sg ?? null,
      wind_speed: hour.windSpeed.sg ?? null,
    }));

    await db("weather_forecast").insert(weatherData);

    return response;

  } catch (error) {
    console.error("Error fetching real-time conditions:", error);
    throw error;
  }
};