import { Knex } from "knex";

/*
swell_sensitivity (0 to 1) → Higher means the spot is highly affected by swell
wind_sensitivity (0 to 1) → Higher means wind significantly impacts visibility
tide_sensitivity (0 to 1) → Higher means tide changes strongly affect diving conditions
refraction_sensitivity (0 to 1) → Higher means the spot experiences more swell refraction
*/

export async function seed(knex: Knex): Promise<void> {
    
    //    await knex("fish").del();
    await knex("dive_spots").del();
    
    const diveSpots = await knex("dive_spots").insert([
        { name: "Long Reef", latitude: -33.740149, longitude: 151.317036, facing_direction: "67.5", swell_sensitivity: 0.5, "wind_sensitivity": 0.8, 
            tide_sensitivity: 1, refraction_sensitivity: 0.1, depth: 10, protected_from: "180", description: "A beautiful reef teeming with life, 15m shelf", entrance: "Beach entry, easy" },
        { name: "Deadmans", latitude: -33.801544, longitude: 151.302348, facing_direction: "67.5", swell_sensitivity: 0.9, "wind_sensitivity": 0.4, 
            tide_sensitivity: 3, refraction_sensitivity: 0.9, depth: 20, protected_from: "180", description: "10m Rock shelf with 20m drop off", entrance: "Rock off, best with high tide and small swell" },
        { name: "Avalon", latitude: -33.626168, longitude: 151.341361, facing_direction: "112.5", swell_sensitivity: 0.9, "wind_sensitivity": 0.6, 
            tide_sensitivity: 2, refraction_sensitivity: 0.9, depth: 20, protected_from: "0", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
    ]).returning("id");

    /*
    const fish = await knex("fish").insert([
        { name: "Tuna" }, { name: "Snapper" }, { name: "Barracuda" }, { name: "Grouper" }, { name: "Mahi Mahi" },
        { name: "Amberjack" }, { name: "Hogfish" }, { name: "Wahoo" }, { name: "Lionfish" }, { name: "Parrotfish" },
        { name: "Surgeonfish" }, { name: "Triggerfish" }, { name: "Butterflyfish" }, { name: "Moorish Idol" },
        { name: "Pufferfish" }, { name: "Eel" }, { name: "Octopus" }, { name: "Squid" }, { name: "Manta Ray" }, { name: "Shark" }
    ]).returning("id");
    */

}