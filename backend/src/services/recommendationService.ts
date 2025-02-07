import { getWeatherData } from "./weatherService";
import { getTideData } from "./tideService";
import { getAllDiveSpots } from "../models/diveSpotModel";
import { calculateDiveScore } from "../recommendation/recommendationModel";
import logger from "../logger";

export const getRecommendedDiveSpot = async (location : string, date : Date) => {
  
  try {
    
    const weatherData = await getWeatherData(location, date);
    const diveSpots = await getAllDiveSpots();
    const tideData = await getTideData(location, date);

    if (tideData === null) {
      throw new Error("No tide data found");
    }
    if (diveSpots === null) {
      throw new Error("No dive spot data found");
    }
    if (weatherData === null) {
      throw new Error("No weather data found");
    }

    const scoredSpots = diveSpots.map(location => {
      const score = calculateDiveScore(location, weatherData, tideData);
      logger.info(`Calculated score of ${score} for ${location.name}`)
      return { ...location, score };
    });

    scoredSpots.sort((a, b) => b.score - a.score);

    return scoredSpots.length > 0 ? scoredSpots[0] : null;

  } catch (error) {
    console.error("Error in recommendation service:", error);
    throw new Error("Failed to get recommended dive spot");
  }
};