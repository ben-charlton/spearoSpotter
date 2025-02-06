export interface DayTides {
    id?: number;
    date: Date;
    location: string
  }
  
  export interface TideEvent {
    id?: number;
    day_tide_id: number; 
    height: number;
    time: Date;
    type: "high" | "low";
  }

  export interface TideRecord {
    dayTide: DayTides,
    tideEvents: Omit<TideEvent, "day_tide_id">[];
}