import db from "../../db"; 

export const getAllDiveSpots = async () => {
  return await db("dive_spots").select("id", "name", "latitude", "longitude", "facing_direction", "swell_sensitivity", "wind_sensitivity", "tide_sensitivity", "refraction_sensitivity", "depth", "description", "entrance");
};

export const getDiveSpotById = async (id: number) => {
  return await db("dive_spots").where({ id }).first();
};

export const getDiveSpotByName = async (name: string) => {
    return await db("dive_spots").where({ name }).first();
  };

export const addDiveSpot = async (diveSpot: { name: string; latitude: number; longitude: number; facing_direction : string; swell_sensitivity : number; wind_sensitivity : number; tide_sensitivity : number; refraction_sensitivity : number; depth : number; description?: string; difficulty?: string }) => {
  return await db("dive_spots").insert(diveSpot).returning("*");
};