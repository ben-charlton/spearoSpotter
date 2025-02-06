import db from "../../db"; 
import { DayTides, TideRecord, TideEvent } from "../types/tide";
import logger from "../logger";

export const getTidesForDateAtLocation = async (date: Date, location: string) : Promise<TideRecord | null> => {
    const tideData = await db("day_tides")
        .where("day_tides.date", date)
        .andWhere("day_tides.location", location)
        .join("tide_events", "day_tides.id", "tide_events.day_tide_id")
        .select(
            "day_tides.date",
            "tide_events.height",
            "tide_events.time",
            "tide_events.type"
        );

    if (tideData.length === 0) { return null };

    const dayTide : DayTides = {
        date: tideData[0].date,
        location: tideData[0].location
    };

    const tideEvents : Omit<TideEvent, "day_tide_id">[] = tideData.map(tide => ({
        height: tide.height,
        time: tide.time,
        type: tide.type as "high" | "low"
    }))

    return { dayTide, tideEvents };

};

