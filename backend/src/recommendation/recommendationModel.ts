import { WeatherRecord } from "../types/weather";
import { DiveSpot } from "../types/spot";
import { TideRecord } from "../types/tide";
import logger from "../logger";

const calculateDirectionalImpact = (spotDirection: number, swellDirection: number) => {
  
  const angleDifference = Math.abs(spotDirection - swellDirection);
  const adjustedAngle = Math.min(angleDifference, 360 - angleDifference); 
  const directionalImpact = Math.exp(-Math.pow(adjustedAngle / 45, 2)); 
  return directionalImpact;

};

const calculateRefractionImpact = (swellDirection: number, facingDirection: number, refractionSensitivity: number) => {

  const angleDifference = Math.abs(swellDirection - facingDirection);
  const adjustedAngle = Math.min(angleDifference, 360 - angleDifference);
  const refractionEffect = Math.max(0, (1 - Math.cos(adjustedAngle * (Math.PI / 180))) * refractionSensitivity * 10);
  return refractionEffect;

};

const calculateSwellInteraction = ( primarySwellDirection: number, secondarySwellDirection: number, spotDirection: number,spotSwellSensitivity: number ) => {
  
  const primaryImpact = calculateDirectionalImpact(spotDirection, primarySwellDirection);
  const secondaryImpact = calculateDirectionalImpact(spotDirection, secondarySwellDirection);
  const angleDifferenceBetweenSwells = Math.abs(primarySwellDirection - secondarySwellDirection);
  const oppositeSwellPenalty = angleDifferenceBetweenSwells > 90 ? 0.2 : 0; 
  return (primaryImpact * 0.9 + secondaryImpact * 0.3) * spotSwellSensitivity - oppositeSwellPenalty;

};

const calculateWindImpact = (windDirection: number, facingDirection: number, protectedFrom: number, windSensitivity: number) => {
  
  const angleDifference = Math.abs(windDirection - facingDirection) % 360; 
  const protectionAngle = Math.abs(windDirection - protectedFrom) % 360;
  const protectionScale = 0.5 * (1 + Math.cos((protectionAngle * Math.PI) / 180));
  const windImpact = windSensitivity * protectionScale * Math.exp(-Math.pow(angleDifference / 90, 2));
  return windImpact;
  
};

const calculateTideImpact = (tideData: TideRecord, spot: DiveSpot) => {
  
  let tideImpact = 0;
  let closestTide = null; 
  let minTimeDiff = Infinity;
  let time = tideData.dayTide.date.setHours(7, 0, 0, 0); 

  for (const tide of tideData.tideEvents) {
    const tideTime = new Date(tide.time);
    const timeDiff = Math.abs(time - tideTime.getTime());

    if (timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff;
      closestTide = tide;
    }
  }

  if (closestTide) {

    tideImpact = closestTide.height * spot.tide_sensitivity;
    if (closestTide.type === spot.best_at) { tideImpact *= 0.5; } else { tideImpact *= 1.5; }

  }

  return tideImpact;
}; 



export const calculateDiveScore = (diveSpot: DiveSpot, weatherData: WeatherRecord, tideData : TideRecord) => {

  let score = 60; 

  const primarySwellDirection = weatherData.swell_direction;
  const secondarySwellDirection = weatherData.secondary_swell_direction;
  const primaryWavePower = weatherData.swell_height * weatherData.swell_height * weatherData.swell_period;
  const secondaryWavePower = weatherData.secondary_swell_height * weatherData.secondary_swell_height * weatherData.secondary_swell_period;
  const totalWavePower = primaryWavePower + secondaryWavePower;

  const swellImpact = totalWavePower * diveSpot.swell_sensitivity * calculateSwellInteraction(primarySwellDirection, secondarySwellDirection, diveSpot.facing_direction, diveSpot.swell_sensitivity);
  const windImpact = weatherData.wind_speed * calculateWindImpact(weatherData.wind_direction, diveSpot.facing_direction, diveSpot.protected_from, diveSpot.wind_sensitivity);
  const tideImpact = calculateTideImpact(tideData, diveSpot);
  const refractionImpact = calculateRefractionImpact(weatherData.swell_direction, diveSpot.facing_direction, diveSpot.refraction_sensitivity);
  const totalDemerits = swellImpact + windImpact + refractionImpact + tideImpact;
  const finalScore = score - totalDemerits;

  return Math.max(finalScore, 0);

};