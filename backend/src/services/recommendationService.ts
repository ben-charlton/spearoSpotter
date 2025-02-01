import { getRealTimeConditions } from "./apiService";
import { getAllDiveSpots } from "../models/diveSpotModel";
import { calculateDiveScore } from "../recommendation/recommendationModel";

export const getRecommendedDiveSpot = async (location : string) => {
  
  try {
    
    // 1. Fetch real-time weather and ocean conditions
    const realTimeData = await getRealTimeConditions(location);

    /*
    // 2. Retrieve all dive spots from the database
    const diveSpots = await getAllDiveSpots();

    // 3. Compute scores for each dive spot
    const scoredSpots = diveSpots.map(location => {
      const score = calculateDiveScore(location, realTimeData);
      return { ...location, score };
    });

    // 4. Sort spots by highest score (best conditions)
    scoredSpots.sort((a, b) => b.score - a.score);

    // 5. Return the best spot
    return scoredSpots.length > 0 ? scoredSpots[0] : null;
    */
   return realTimeData;

  } catch (error) {
    console.error("Error in recommendation service:", error);
    throw new Error("Failed to get recommended dive spot");
  }
};