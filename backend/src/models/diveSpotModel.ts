import db from "../../db"; 

export const getAllDiveSpots = async () => {
  return await db("dive_spots").select("id", "name", "latitude", "longitude", "description", "entrance");
};

export const getDiveSpotById = async (id: number) => {
  return await db("dive_spots").where({ id }).first();
};

export const addDiveSpot = async (diveSpot: { name: string; latitude: number; longitude: number; description?: string; difficulty?: string }) => {
  return await db("dive_spots").insert(diveSpot).returning("*");
};