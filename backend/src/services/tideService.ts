import { getTidesForDateAtLocation } from './../models/tideModel'
import fetch from "node-fetch";
import db from "../../db"; 
import logger  from "../logger";
import { DayTides, TideRecord, TideEvent } from '../types/tide';


const locationMap: Record<string, { lat: number; lng: number }> = {
  "sydney" : { lat: -33.740149, lng: 151.317036 }
};

export const getCoordinates = (location: string) => {
  const lowerCaseLocation = location.toLowerCase();
  return locationMap[lowerCaseLocation] || null; 
};

export const getTideData  = async (location: string, date : Date) : Promise<TideRecord | null> => {
  
  const coords = getCoordinates(location);
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing API Key for Stormglass");
  }

  try {
    
    logger.info("Attempting to get tide data from db");
    const existingData = await getTidesForDateAtLocation(date, location);

    if (existingData) {
      logger.info(`✅ Returning cached tide data for ${location} - ${existingData}`);
      return existingData; 
    }

    logger.info(`🌊 Fetching new tide data for ${location}`);
    const response = await fetch( `https://api.stormglass.io/v2/tide/extremes/point?lat=${coords.lat}&lng=${coords.lng}`, {
        method: "GET",
        headers: { Authorization: apiKey },
      }
    );

    const data = await response.json();
    const { dayTide, tideEvents } = mapTideResponseToDbRecord(data, location);
    await insertTideData(date, location, tideEvents);
    return { dayTide, tideEvents } as TideRecord;


  } catch (error) {
    console.error("Error fetching real-time conditions:", error);
    throw error;
  }
};

export const insertTideData = async (date: Date, location: string, tideEvents: Omit<TideEvent, "day_tide_id">[]) => {
    // Extract unique dates in YYYY-MM-DD format
    const uniqueDates = Array.from(
        new Set(
            tideEvents.map(tide => new Date(tide.time).toISOString().split("T")[0])
        )
    );

    console.log("Unique dates to check:", uniqueDates);

    // Query existing `day_tides` for this location
    const existingDayTides = await db("day_tides")
        .whereIn("date", uniqueDates)
        .andWhere("location", location);

    console.log("Existing day_tides in DB:", existingDayTides);

    // Convert existing DB dates to YYYY-MM-DD strings for comparison
    const existingDayTideSet = new Set(
        existingDayTides.map(dayTide => new Date(dayTide.date).toISOString().split("T")[0])
    );

    // Filter out dates that already exist
    const newDayTides = uniqueDates
        .filter(date => !existingDayTideSet.has(date)) // Ensures proper date comparison
        .map(date => ({ date, location }));

    console.log("New day_tides to insert:", newDayTides);

    // Insert missing day_tides and return their IDs
    let insertedDayTides: { id: number; date: string }[] = [];
    if (newDayTides.length > 0) {
        insertedDayTides = await db("day_tides")
            .insert(newDayTides)
            .returning(["id", "date"]);
    }

    console.log("Inserted day_tides:", insertedDayTides);

    // Merge new and existing day_tides
    const allDayTides = [...existingDayTides, ...insertedDayTides];

    // Map tide events to correct `day_tide_id`
    const tideData = tideEvents.map(tideEvent => {
        const tideDate = new Date(tideEvent.time).toISOString().split("T")[0];
        const dayTide = allDayTides.find(dt => new Date(dt.date).toISOString().split("T")[0] === tideDate);

        return {
            day_tide_id: dayTide?.id,
            height: tideEvent.height,
            time: tideEvent.time,
            type: tideEvent.type,
        };
    });

    console.log("Final tide events to insert:", tideData);

    // Insert tide events
    if (tideData.length > 0) {
        await db("tide_events").insert(tideData);
    }
};



export const mapTideResponseToDbRecord = (tideResponse: any, location: string) => {
    const tides: Omit<TideEvent, "day_tide_id">[] = tideResponse.data.map((tide: any) => ({
        height: tide.height,
        time: new Date(tide.time),
        type: tide.type as "high" | "low",
    }));

    // 🔹 Normalize date to start of the day (00:00)
    const date = new Date(tides[0].time);
    date.setHours(0, 0, 0, 0);

    return {
        dayTide: { date, location },  // Ensure uniqueness
        tideEvents: tides,
    };
};