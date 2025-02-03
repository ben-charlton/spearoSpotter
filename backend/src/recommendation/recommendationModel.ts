import { WeatherDbRecord } from "../types/weather";
import { DiveSpot } from "../types/spot";

const calculateRefractionImpact = (swellDirection: number, facingDirection: number, refractionSensitivity: number) => {
  const angleDifference = Math.abs(swellDirection - facingDirection);
  const refractionEffect = (1 - Math.cos(angleDifference * (Math.PI / 180))) * refractionSensitivity * 10;
  return refractionEffect;
};

const calculateDirectionalImpact = (spotDirection: number, swellDirection: number) => {
  const angleDifference = Math.abs(spotDirection - swellDirection);
  const directionalImpact = Math.max(0, 1 - angleDifference / 180);
  return directionalImpact;
};

const calculateSwellInteraction = (
  primarySwellDirection: number, 
  secondarySwellDirection: number, 
  spotDirection: number
) => {
  const primaryImpact = calculateDirectionalImpact(spotDirection, primarySwellDirection);
  const secondaryImpact = calculateDirectionalImpact(spotDirection, secondarySwellDirection);

  const oppositeSwellPenalty = Math.abs(primarySwellDirection - secondarySwellDirection) > 90 ? 0.1 : 0;

  return (primaryImpact * 0.7 + secondaryImpact * 0.3) - oppositeSwellPenalty;
};


const calculateWindImpact = (windDirection: number, protectedFrom: number, windSensitivity: number) => {
  
  const angleDifference = Math.abs(windDirection - protectedFrom);
  let protectionScale = 0;
  if (angleDifference <= 45) {
      protectionScale = 0; 
  } else if (angleDifference <= 90) {
      protectionScale = (angleDifference - 45) / 45; 
  } else {
      protectionScale = 1; 
  }
  return windSensitivity * protectionScale;
};

export const calculateDiveScore = (diveSpot : DiveSpot, realTimeData : WeatherDbRecord) => {

  let score = 60;

  const primarySwellDirection = realTimeData.swell_direction;
  const secondarySwellDirection = realTimeData.secondary_swell_direction;
  const primaryWavePower = realTimeData.swell_height * realTimeData.swell_height * realTimeData.swell_period;
  const secondaryWavePower = realTimeData.secondary_swell_height * realTimeData.secondary_swell_height * realTimeData.secondary_swell_period;
  const totalWavePower = primaryWavePower + secondaryWavePower;

  const swellImpact = totalWavePower * diveSpot.swell_sensitivity * calculateSwellInteraction( primarySwellDirection, secondarySwellDirection, diveSpot.facing_direction ) * 2;
  const windImpact = realTimeData.wind_speed * calculateWindImpact(realTimeData.wind_direction, diveSpot.protected_from, diveSpot.wind_sensitivity);
  const refractionImpact = calculateRefractionImpact(realTimeData.swell_direction, diveSpot.facing_direction, diveSpot.refraction_sensitivity);

  const totalDemerits = swellImpact + windImpact + refractionImpact;
  const finalScore = score - totalDemerits;
    
  return Math.max(finalScore, 0);

  };