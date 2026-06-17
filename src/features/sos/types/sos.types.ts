export interface SOSTriggerData {
  location_address: string;
  latitude: number | null;
  longitude: number | null;
  incident_type: string;
  description: string;
}

export interface PoliceStation {
  name: string;
  coordinates: [number, number];
  district: string;
  state: string;
  distance_km: number;
}

export interface CrimeData {
  incident_type: string;
  city: string;
  state: string;
  summary: string;
  year: number;
  day?: string;
  month?: string;
  latitude: number;
  longitude: number;
  // Keep optional aliases for backward compatibility/local CSV
  "attack type"?: string;
  district?: string;
  state_ut?: string;
}
