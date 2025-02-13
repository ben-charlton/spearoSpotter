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
            tide_sensitivity: 0.3, refraction_sensitivity: 0.1, depth: 10, protected_from: 180, best_at: "low", description: "Long Reef is home to a beautiful reef teeming with life. \
            It is protected from the South by the reef itself, and is quite often best at low tides. Entrance is via the beach, and you will find as \
            you swim out along the reef, there is a 15m shelf where you will find plenty of reef species.", entrance: "Beach entry, easy" },
        { name: "Deadmans", latitude: -33.801544, longitude: 151.302348, facing_direction: 67.5, swell_sensitivity: 0.9, wind_sensitivity: 0.4, 
            tide_sensitivity: 0.7, refraction_sensitivity: 0.9, depth: 20, protected_from: 180, best_at: "high", description: "Deadmans is a great spot to find pelagic species \
            as it captures a lot of swell coming from the South refracting around the headland, and is quite often best at high tides. Entrance is via the South side of Shelly Beach \
            off the rocks. As you swim against the rock shelf, there is a ~20m drop-off where you will find plenty of species.", entrance: "Rock off, best with high tide and small swell" },
        { name: "Avalon", latitude: -33.626168, longitude: 151.341361, facing_direction: 112.5, swell_sensitivity: 0.9, wind_sensitivity: 0.6, 
            tide_sensitivity: 0.7, refraction_sensitivity: 0.9, depth: 20, protected_from: 0, best_at: "high", description: "Avalon is a great spot to find pelagic species \
            as it captures a lot of swell coming from the South refracting around the headland, and is quite often best at high tides. Entrance is via the South side of Shelly Beach \
            off the rocks. As you swim against the rock shelf, there is a ~20m drop-off where you will find plenty of species.", entrance: "Rock off, best with high tide and small swell" },
        { name: "Newport Reef North Side", latitude: -33.659376, longitude: 151.328456, facing_direction: 45, swell_sensitivity: 0.5, wind_sensitivity: 0.9, 
            tide_sensitivity: 0.8, refraction_sensitivity: 0.4, depth: 15, protected_from: 180, best_at: "low", description: "Newport Reef is home to a beautiful reef teeming with life. \
            The North side is protected from the South by the reef itself, and is quite often best at low tides. Entrance is via the beach, and you will find as \
            you swim out along the reef, there is a 15m shelf where you will find plenty of reef species", entrance: "Rock off, best with high tide and small swell" },
        { name: "Newport Reef South Side", latitude: -33.661337, longitude: 151.327458, facing_direction: 135, swell_sensitivity: 0.5, wind_sensitivity: 0.9, 
            tide_sensitivity: 0.8, refraction_sensitivity: 0.4, depth: 15, protected_from: 0, best_at: "low", description: "Newport Reef is home to a beautiful reef teeming with life. \
            The South side is protected from the North by the reef itself, and is quite often best at low tides. Entrance is via the beach, and you will find as \
            you swim out along the reef, there is a 15m shelf where you will find plenty of reef species", entrance: "Rock off, best with high tide and small swell" },
        { name: "Bungan Rockpool", latitude: -33.676234, longitude: 151.319872, facing_direction: 100, swell_sensitivity: 0.6, wind_sensitivity: 0.9, 
            tide_sensitivity: 0.8, refraction_sensitivity: 0.5, depth: 20, protected_from: 30, best_at: "low", description: "Bungan Rockpool is a great spot to find reef species \
            as it has a beautiful reef at approx ~10-15m depth With plenty of life. Entrance is via the North end of Mona Vale Beach Basin. As you swim against the rock shelf towards Bungan, \
            there is a ~20m drop-off where you will find plenty of species.", entrance: "Rock off, best with high tide and small swell" },
        { name: "North Curl Curl", latitude: -33.767523, longitude: 151.302835, facing_direction: 90, swell_sensitivity: 1, wind_sensitivity: 0.6, 
            tide_sensitivity: 0.7, refraction_sensitivity: 0.9, depth: 20, protected_from: 0, best_at: "high", description: "North Curl Curl is a great spot to find reef species \
            as it has a beautiful reef at approx ~15m depth With plenty of life. Entrance is via the North end of Curl Curl off the rocks. As you swim against the rock shelf towards Dee Why, \
            there is a ~20m drop-off where you will find plenty of species", entrance: "Rock off, best with high tide and small swell" },
        { name: "Freshwater", latitude: -33.782175, longitude: 151.295955, facing_direction: 112.5, swell_sensitivity: 0.5, wind_sensitivity: 0.6, 
            tide_sensitivity: 0.2, refraction_sensitivity: 0.6, depth: 20, protected_from: 35, best_at: "low", description: "Freshwater is a great spot to find reef species \
            as it has a beautiful reef at approx ~15m depth With plenty of life. Entrance is via the North end of Freshwater Beach off the rocks. As you swim against the rock shelf towards Curl Curl, \
            there is a ~20m drop-off where you will find plenty of species", entrance: "Rock off, best with high tide and small swell" },
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