import { Request, Response } from "express";
import { getRecommendedDiveSpot } from "../services/recommendationService";
import logger from "../logger";

export const recommendDiveSpot = async (req: Request, res: Response) => {
  try {
    logger.info("🔥 Route hit: /api/dive-spots/recommendation");

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

    logger.info(`📍 Fetching recommendations for: ${location}`);
    const recommendedSpot = await getRecommendedDiveSpot(location, day);

    return res.status(200).json({ data: recommendedSpot });

  } catch (error: any) {
    logger.error(`❌ Error in recommendation controller: ${error.message}`);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};