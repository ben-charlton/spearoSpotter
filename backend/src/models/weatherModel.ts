import db from "../../db"; 

export const getConditionsByDay = async (location: string) => {
    const today = new Date();
    today.setUTCHours(12, 0, 0, 0); 
  
    return await db("weather_forecast")
      .where("location", location)
      .andWhere("forecast_time", today.toISOString())
      .first();
  };