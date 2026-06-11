export interface SOSTriggerData {
  location: string;
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
  "attack type": string;
  city: string;
  state: string;
  summary: string;
  year: number;
  day?: string;
  month?: string;
  Latitude?: number;
  Longitude?: number;
}
