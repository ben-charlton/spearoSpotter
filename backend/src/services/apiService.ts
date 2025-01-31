import fetch from "node-fetch";

export const getRealTimeConditions = async (location : string) => {
  try {
    // Example: Fetch data from Stormglass or OpenWeather APIs
    const response = await fetch("https://api.stormglass.io/v2/weather/point", {
    });

    return response;
  } catch (error) {
    console.error("Error fetching real-time conditions:", error);
    throw error;
  }
};