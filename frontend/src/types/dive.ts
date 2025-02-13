export interface Recommendation {
    name: string;
    description: string;
}
  
export interface Weather {
    wave_height: number;
    swell_direction: number;
    swell_period: number;
    wind_speed: number;
    wind_direction: number;
    water_temperature: number;
    cloud_cover: number;
}