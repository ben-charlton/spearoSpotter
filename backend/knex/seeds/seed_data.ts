import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Clear existing data
    await knex("dive_spot_fish").del();
    await knex("fish").del();
    await knex("dive_spots").del();

    // Insert Dive Spots
    const diveSpots = await knex("dive_spots").insert([
        { name: "Blue Reef", latitude: -33.8688, longitude: 151.2093, description: "A beautiful reef teeming with life", entrance: "Intermediate" },
        { name: "Shark Cove", latitude: -31.5639, longitude: 159.0293, description: "Known for its shark sightings", entrance: "Advanced" },
        { name: "Coral Garden", latitude: -32.5648, longitude: 152.7593, description: "Colorful corals and clear waters", entrance: "Beginner" },
        { name: "Deep Trench", latitude: -29.1234, longitude: 153.9456, description: "A deep dive site with strong currents", entrance: "Expert" },
        { name: "Seahorse Bay", latitude: -34.9876, longitude: 150.8765, description: "Great for macro photography", entrance: "Beginner" }
    ]).returning("id");

    // Insert Fish
    const fish = await knex("fish").insert([
        { name: "Tuna" }, { name: "Snapper" }, { name: "Barracuda" }, { name: "Grouper" }, { name: "Mahi Mahi" },
        { name: "Amberjack" }, { name: "Hogfish" }, { name: "Wahoo" }, { name: "Lionfish" }, { name: "Parrotfish" },
        { name: "Surgeonfish" }, { name: "Triggerfish" }, { name: "Butterflyfish" }, { name: "Moorish Idol" },
        { name: "Pufferfish" }, { name: "Eel" }, { name: "Octopus" }, { name: "Squid" }, { name: "Manta Ray" }, { name: "Shark" }
    ]).returning("id");

    // Assign Random Fish to Dive Spots
    const diveSpotFishPairs: any[] = [];
    diveSpots.forEach((diveSpot) => {
        const randomFish = fish.sort(() => 0.5 - Math.random()).slice(0, 4); // Pick 4 random fish
        randomFish.forEach(f => diveSpotFishPairs.push({ dive_spot_id: diveSpot.id, fish_id: f.id }));
    });

    await knex("dive_spot_fish").insert(diveSpotFishPairs);
}