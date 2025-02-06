export interface WeatherMetric {
    noaa?: number;
    sg?: number;
    meteo?: number;
  }
  
  export interface WeatherHour {
    time: string;
    airTemperature: WeatherMetric;
    cloudCover: WeatherMetric;
    secondarySwellDirection: WeatherMetric;
    secondarySwellHeight: WeatherMetric;
    secondarySwellPeriod: WeatherMetric;
    swellDirection: WeatherMetric;
    swellHeight: WeatherMetric;
    swellPeriod: WeatherMetric;
    waterTemperature: WeatherMetric;
    waveHeight: WeatherMetric;
    windDirection: WeatherMetric;
    windSpeed: WeatherMetric;
  }
  
  export interface WeatherResponse {
      hours: WeatherHour[];
  }
  
  export interface WeatherRecord {
    time: string;
    air_temperature: number;
    cloud_cover: number;
    secondary_swell_direction: number;
    secondary_swell_height: number;
    secondary_swell_period: number;
    swell_direction: number;
    swell_height: number;
    swell_period: number;
    water_temperature: number;
    wave_height: number;
    wind_direction: number;
    wind_speed: number;
  }
  
  export const mapToDbRecord = (data: WeatherHour): WeatherRecord => ({
    time: data.time,
    air_temperature: data.airTemperature.sg ?? 0,
    cloud_cover: data.cloudCover.sg ?? 0,
    secondary_swell_direction: data.secondarySwellDirection.sg ?? 0,
    secondary_swell_height: data.secondarySwellHeight.sg ?? 0,
    secondary_swell_period: data.secondarySwellPeriod.sg ?? 0,
    swell_direction: data.swellDirection.sg ?? 0,
    swell_height: data.swellHeight.sg ?? 0,
    swell_period: data.swellPeriod.sg ?? 0,
    water_temperature: data.waterTemperature.sg ?? 0,
    wave_height: data.waveHeight.sg ?? 0,
    wind_direction: data.windDirection.sg ?? 0,
    wind_speed: data.windSpeed.sg ?? 0,
  });