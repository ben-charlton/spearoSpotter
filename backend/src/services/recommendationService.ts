import { getRealTimeConditions } from "./apiService";
import { getAllDiveSpots } from "../models/diveSpotModel";
import { calculateDiveScore } from "../recommendation/recommendationModel";
import logger from "../logger";
import { WeatherDbRecord } from "../types/weather";
import { DiveSpot } from "../types/spot";

export const getRecommendedDiveSpot = async (location : string) => {
  
  try {
    
    const realTimeData : WeatherDbRecord = await getRealTimeConditions(location);
    const diveSpots : DiveSpot[] = await getAllDiveSpots();

    const scoredSpots = diveSpots.map(location => {
      const score = calculateDiveScore(location, realTimeData);
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