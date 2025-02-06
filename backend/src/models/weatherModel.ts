import db from "../../db"; 

export const getConditionsByDay = async (location: string, day : Date) => {
    
    day.setUTCHours(12, 0, 0, 0); 
  
    return await db("weather_forecast")
      .where("location", location)
      .andWhere("forecast_time", day.toISOString())
      .first();
};