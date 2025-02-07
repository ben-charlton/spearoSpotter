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
        { name: "Long Reef", latitude: -33.740149, longitude: 151.317036, facing_direction: 67.5, swell_sensitivity: 0.5, wind_sensitivity : 0.8, 
            tide_sensitivity: 0.3, refraction_sensitivity: 0.1, depth: 10, protected_from: 180, best_at: "low", description: "A beautiful reef teeming with life, 15m shelf", entrance: "Beach entry, easy" },
        { name: "Deadmans", latitude: -33.801544, longitude: 151.302348, facing_direction: 67.5, swell_sensitivity: 0.9, wind_sensitivity: 0.4, 
            tide_sensitivity: 0.7, refraction_sensitivity: 0.9, depth: 20, protected_from: 180, best_at: "high", description: "10m Rock shelf with 20m drop off", entrance: "Rock off, best with high tide and small swell" },
        { name: "Avalon", latitude: -33.626168, longitude: 151.341361, facing_direction: 112.5, swell_sensitivity: 0.9, wind_sensitivity: 0.6, 
            tide_sensitivity: 0.7, refraction_sensitivity: 0.9, depth: 20, protected_from: 0, best_at: "high", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
        { name: "Newport Reef North Side", latitude: -33.659376, longitude: 151.328456, facing_direction: 45, swell_sensitivity: 0.5, wind_sensitivity: 0.9, 
            tide_sensitivity: 0.8, refraction_sensitivity: 0.4, depth: 15, protected_from: 180, best_at: "low", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
        { name: "Newport Reef South Side", latitude: -33.659376, longitude: 151.328456, facing_direction: 135, swell_sensitivity: 0.5, wind_sensitivity: 0.9, 
            tide_sensitivity: 0.8, refraction_sensitivity: 0.4, depth: 15, protected_from: 0, best_at: "low", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
        { name: "Bungan Rockpool", latitude: -33.676234, longitude: 151.319872, facing_direction: 100, swell_sensitivity: 0.6, wind_sensitivity: 0.9, 
            tide_sensitivity: 0.8, refraction_sensitivity: 0.5, depth: 20, protected_from: 30, best_at: "low", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
        { name: "North Curl Curl", latitude: -33.767523, longitude: 151.302835, facing_direction: 90, swell_sensitivity: 1, wind_sensitivity: 0.6, 
            tide_sensitivity: 0.7, refraction_sensitivity: 0.9, depth: 20, protected_from: 0, best_at: "high", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
        { name: "Freshwater", latitude: -33.782175, longitude: 151.295955, facing_direction: 112.5, swell_sensitivity: 0.5, wind_sensitivity: 0.6, 
            tide_sensitivity: 0.2, refraction_sensitivity: 0.6, depth: 20, protected_from: 35, best_at: "low", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
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