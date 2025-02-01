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
  