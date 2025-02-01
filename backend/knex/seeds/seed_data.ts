import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    await knex("dive_spot_fish").del();
    await knex("fish").del();
    await knex("dive_spots").del();
    
    const diveSpots = await knex("dive_spots").insert([
        { name: "Long Reef", latitude: -33.740149, longitude: 151.317036, facing_direction: "ENE", swell_sensitivity: 1, "wind_sensitivity": 1, 
            tide_sensitivity: 1, refraction_sensitivity: 1, depth: 10, protected_from: "S", description: "A beautiful reef teeming with life, 15m shelf", entrance: "Beach entry, easy" },
        { name: "Deadmans", latitude: -33.801544, longitude: 151.302348, facing_direction: "ENE", swell_sensitivity: 2, "wind_sensitivity": 2, 
            tide_sensitivity: 3, refraction_sensitivity: 3, depth: 20, protected_from: "S", description: "10m Rock shelf with 20m drop off", entrance: "Rock off, best with high tide and small swell" },
        { name: "Avalon", latitude: -33.626168, longitude: 151.341361, facing_direction: "ESE", swell_sensitivity: 3, "wind_sensitivity": 3, 
            tide_sensitivity: 2, refraction_sensitivity: 1, depth: 20, protected_from: "N", description: "A beautiful reef teeming with life", entrance: "Rock off, best with high tide and small swell" },
    ]).returning("id");

    
    const fish = await knex("fish").insert([
        { name: "Tuna" }, { name: "Snapper" }, { name: "Barracuda" }, { name: "Grouper" }, { name: "Mahi Mahi" },
        { name: "Amberjack" }, { name: "Hogfish" }, { name: "Wahoo" }, { name: "Lionfish" }, { name: "Parrotfish" },
        { name: "Surgeonfish" }, { name: "Triggerfish" }, { name: "Butterflyfish" }, { name: "Moorish Idol" },
        { name: "Pufferfish" }, { name: "Eel" }, { name: "Octopus" }, { name: "Squid" }, { name: "Manta Ray" }, { name: "Shark" }
    ]).returning("id");

}