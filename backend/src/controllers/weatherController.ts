import { Request, Response } from "express";
import logger from "../logger";
import { getWeatherData } from "../services/weatherService";
import redisClient from "../redisClient";

export const getConditions = async (req: Request, res: Response) => {
  try {
    logger.info("🔥 Route hit: /api/weather/conditions");

    const location = req.query.location as string;
    if (!location) {
      logger.warn("⚠️ No location provided in request body");
      return res.status(400).json({ success: false, message: "Location is required" });
    }

    const dayString = req.query.day as string;
    if (!dayString) {
      logger.warn("⚠️ No day provided in request body");
      return res.status(400).json({ success: false, message: "Day is required" });
    }

    const day = new Date(dayString);
    if (isNaN(day.getTime())) {
      logger.warn("⚠️ Invalid day provided in request body");
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    logger.info(`📍 Fetching conditions for: ${location}`);

    const cacheKey = `conditions:${location}:${day}`;
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("🚀 Returning cached weather");
      return res.status(200).json({ data: JSON.parse(cachedData) });
    }

    const conditions = await getWeatherData(location, day);

    await redisClient.set(cacheKey, JSON.stringify(conditions), {
      EX: 21600, 
    });

    return res.status(200).json({ data: conditions });

  } catch (error: any) {
    logger.error(`❌ Error in weather controller: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};