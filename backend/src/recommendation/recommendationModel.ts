import { WeatherRecord } from "../types/weather";
import { DiveSpot } from "../types/spot";
import { DayTides, TideRecord } from "../types/tide";

const calculateDirectionalImpact = (spotDirection: number, swellDirection: number) => {
  const angleDifference = Math.abs(spotDirection - swellDirection);
  const adjustedAngle = Math.min(angleDifference, 360 - angleDifference); // Ensure angle difference is between 0 and 180
  const directionalImpact = Math.exp(-Math.pow(adjustedAngle / 45, 2)); // Using exponential decay for smoother impact reduction
  return directionalImpact;
};

const calculateRefractionImpact = (swellDirection: number, facingDirection: number, refractionSensitivity: number) => {
  const angleDifference = Math.abs(swellDirection - facingDirection);
  const adjustedAngle = Math.min(angleDifference, 360 - angleDifference); // Ensure angle difference is between 0 and 180
  const refractionEffect = Math.max(0, (1 - Math.cos(adjustedAngle * (Math.PI / 180))) * refractionSensitivity * 10);
  return refractionEffect;
};

const calculateTideImpact = (tideData: TideRecord, tideSensitivity: number) => {
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

    tideImpact = closestTide.height * tideSensitivity;
    if (closestTide.type == "high") { tideImpact *= 1.5; } else { tideImpact *= 0.75; }

  }

  return tideImpact;
}; 

const calculateSwellInteraction = (
  primarySwellDirection: number, 
  secondarySwellDirection: number, 
  spotDirection: number,
  spotSwellSensitivity: number
) => {
  const primaryImpact = calculateDirectionalImpact(spotDirection, primarySwellDirection);
  const secondaryImpact = calculateDirectionalImpact(spotDirection, secondarySwellDirection);

  // Higher penalty for large angle differences between primary and secondary swells
  const angleDifferenceBetweenSwells = Math.abs(primarySwellDirection - secondarySwellDirection);
  const oppositeSwellPenalty = angleDifferenceBetweenSwells > 90 ? 0.2 : 0; // Increase penalty for significant differences

  // Adjust weight more towards primary swell
  return (primaryImpact * 0.8 + secondaryImpact * 0.2) * spotSwellSensitivity - oppositeSwellPenalty;
};

const calculateWindImpact = (windDirection: number, facingDirection: number, protectedFrom: number, windSensitivity: number) => {
  const angleDifference = Math.abs(windDirection - facingDirection); // Calculate angle difference between wind and facing direction
  const protectionAngle = Math.abs(windDirection - protectedFrom); // Angle difference with protection direction
  
  // Protection scale based on how close the wind is to being unprotected
  let protectionScale = 0;
  if (protectionAngle <= 45) {
    protectionScale = 0; // Protected
  } else if (protectionAngle <= 90) {
    protectionScale = (protectionAngle - 45) / 45; // Gradually exposed
  } else {
    protectionScale = 1; // Fully exposed
  }

  // Exponentially reduce the wind impact based on how much the wind direction deviates from the facing direction
  const windImpact = windSensitivity * protectionScale * Math.exp(-Math.pow(angleDifference / 90, 2)); // Use an exponential decay for greater reduction with larger angle differences
  return windImpact;
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

  const tideImpact = calculateTideImpact(tideData, diveSpot.tide_sensitivity);
  
  const refractionImpact = calculateRefractionImpact(weatherData.swell_direction, diveSpot.facing_direction, diveSpot.refraction_sensitivity);

  const totalDemerits = swellImpact + windImpact + refractionImpact;

  const finalScore = score - totalDemerits;

  return Math.max(finalScore, 0);
};

/*

Key Improvements:
Swell Interaction:

A smoother impact calculation using an exponential decay (Math.exp) for angle differences. This helps to reflect the diminishing impact as the angle moves away from being head-on.
Interaction between primary and secondary swells now considers the relative angle between them, with a small penalty for large angle differences (i.e., if they are 90+ degrees apart).
Wind Impact:

Wind impact now scales both based on the protection angle and the distance from the facing direction. The exposure penalty increases exponentially as the wind moves from a protected angle to an unprotected one.
The wind's relative direction to the spot’s facing direction is factored in with an exponential penalty (Math.pow), making the impact more sensitive as the direction deviates.
Refraction Impact:

Refraction effect uses a similar logic as the other factors but considers how much the swell direction differs from the spot's facing direction. This ensures the more direct the swell direction, the greater the effect.
Additional Considerations:
You might want to experiment with the constants (like 0.7, 0.3, 10 in the formulas) to tune the model according to real-world data or testing results.
You can tweak the protection scale (0.5, 0.8 sensitivity, etc.) depending on how much weight you want to give to each factor in the overall dive score.

Wind Impact:

The angleDifference now plays a role in reducing wind impact exponentially based on how far off the wind direction is from the facing direction.
The protection angle also ensures that the effect varies depending on whether the wind is hitting from a protected direction.
Swell Impact:

The primary swell now has a higher weight (80%) than the secondary swell (20%).
A penalty is applied if the primary and secondary swells have large angle differences (>90 degrees).
Refraction Impact:

Refraction now considers the absolute angle difference between the swell direction and the spot's facing direction.
Smaller angle differences result in higher refraction impact.
Dive Score:

The final dive score now applies larger penalties for swell and wind impact, making the factors more sensitive and distinct for each spot.


*/


/*
  To calculate;
1. get the primary and secondary wave powers (multiply each of the swell_height^2 * swell_period)
2. from that, get the swell impact (multiply the wave powers * the spot sensitivity to swell * the swell interaction)
  - the swell interaction here is basically, I look at the direction the spot faces, and if the direction of the swell is going to hit it theres more of an impact
  - its basically a sliding scale, if its head on it will have the most impact and if its opposite direction it will have the least
3. get the wind impact in a similar fashion
  - check the direction of the wind against the way the spot is facing + its sensitivity
4. get the refractional impact
  - same again, head on is more impactful than not head on. 
  - also considering reflection, i score somewhere like deadmans with a higher sensitivity because you get the reflection off the wall as opposed to e.g. long reef 
5. subtract all these impacts off a score, highest score wins

*/