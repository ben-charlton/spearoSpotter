export interface DiveSpot {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    facing_direction: number;
    protected_from: number;
    swell_sensitivity: number;
    wind_sensitivity: number;
    tide_sensitivity: number;
    refraction_sensitivity: number;
    description: string | null;
    depth: number | null;
    entrance: string | null;
    created_at: Date;
  }