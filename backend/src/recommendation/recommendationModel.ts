export const calculateDiveScore = (diveSpot : any, realTimeData : any) => {
    
    let baseScore = 60; // Start with a base score of 60
  
    const { swell, wind, tide } = realTimeData;
    const { facing_direction } = diveSpot; // Assume this is stored in DB
  
    // 1. **Swell Impact**
    const swellImpact = getSwellImpact(swell, facing_direction);
    baseScore -= swellImpact;
  
    // 2. **Wind Impact**
    const windImpact = getWindImpact(wind, facing_direction);
    baseScore -= windImpact;
  
    // 3. **Tide Impact**
    const tideImpact = getTideImpact(tide, diveSpot);
    baseScore -= tideImpact;
  
    // Ensure score is within valid bounds
    return Math.max(baseScore, 0);
  };
  
  // Example functions for different scoring factors
  
  const getSwellImpact = (swell : any, facing_direction : any) => {
    let impact = 0;
    if (swell.direction === facing_direction) {
      impact += swell.height * swell.period; // Higher height and period = stronger impact
    }
    return impact;
  };
  
  const getWindImpact = (wind : any, facing_direction : string) => {
    let impact = 0;
    if (wind.direction === facing_direction) {
      impact += wind.speed * 2; // Wind directly hitting the dive spot is worse
    }
    return impact;
  };
  
  const getTideImpact = (tide : any, diveSpot : any) => {
    let impact = 0;
    if (diveSpot.is_sensitive_to_tide && tide.height > 1.5) {
      impact += 5; // Arbitrary value for bad tide conditions
    }
    return impact;
  };

  