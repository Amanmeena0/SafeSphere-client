import apiClient from "@/lib/apiClient";
import axios from "axios";
import { SOSTriggerData, PoliceStation, CrimeData } from "../types/sos.types";

/**
 * Normalizes crime data from various sources (Backend API or CSV)
 * to a consistent format for the map and filters.
 */
const normalizeCrimeData = (data: any[]): CrimeData[] => {
  if (!Array.isArray(data)) return [];
  
  return data.map((item) => {
    // Prioritize backend's new standard incident_type, fallback to attack type
    const incidentType = item.incident_type || item["attack type"] || item.attack_type || item.crime_type || "N/A";
    
    return {
      incident_type: incidentType,
      "attack type": incidentType, // Alias for legacy UI components if needed
      city: item.city || item.district || "Unknown",
      state: item.state || item.state_ut || "Unknown",
      summary: item.summary || item.incident_description || "No details available",
      year: parseInt(item.year) || new Date().getFullYear(),
      day: item.day || "",
      month: item.month || "",
      latitude: parseFloat(item.latitude || item.Latitude || item.lat),
      longitude: parseFloat(item.longitude || item.Longitude || item.lon || item.lng),
    };
  }).filter(item => !isNaN(item.latitude) && !isNaN(item.longitude));
};

/**
 * Utility to parse the local CSV data if the API is unavailable.
 * Uses a manual parser to handle quoted strings containing commas.
 */
const parseCrimeCSV = (csvText: string): any[] => {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 3) return [];

  // The specific CSV format has two header lines, data starts from line 3
  const dataLines = lines.slice(2);
  const result: any[] = [];

  /**
   * Helper to split a CSV line correctly while respecting quoted values.
   */
  const splitCSVLine = (line: string): string[] => {
    const fields: string[] = [];
    let currentField = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        fields.push(currentField.trim());
        currentField = "";
      } else {
        currentField += char;
      }
    }
    fields.push(currentField.trim());
    return fields;
  };

  dataLines.forEach((line) => {
    if (!line.trim()) return;
    const columns = splitCSVLine(line);
    
    // Ensure we have enough columns and basic coordinate data
    if (columns.length >= 10 && columns[5] && columns[6]) {
      result.push({
        year: columns[0],
        month: columns[1],
        day: columns[2],
        state: columns[3],
        city: columns[4],
        Latitude: columns[5],
        Longitude: columns[6],
        summary: columns[8],
        "attack type": columns[9],
      });
    }
  });

  return result;
};

export const sosService = {
  triggerSOS: async (data: SOSTriggerData): Promise<void> => {
    await apiClient.post("/api/sos/trigger", data);
  },

  getNearestPoliceStations: async (
    lat: number,
    lon: number,
    top: number = 3
  ): Promise<PoliceStation[]> => {
    const res = await apiClient.get<PoliceStation[]>(
      `/api/police/stations/nearest?lat=${lat}&lon=${lon}&top=${top}`
    );
    return res.data;
  },

  getCrimeData: async (): Promise<CrimeData[]> => {
    try {
      // Primary: Fetch from the backend API
      const res = await apiClient.get<any[]>("/api/crime/clusters", {
        params: { limit: 200 }
      });
      
      if (Array.isArray(res.data) && res.data.length > 0) {
        return normalizeCrimeData(res.data);
      }
      
      // If API returns success but empty, we still try fallback
      console.warn("API returned empty crime data.");
    } catch (error) {
      console.warn("API fetch for crime data failed. Using local fallback...", error);
    }
    
    try {
      // Fallback: Fetch from the local public CSV file
      const csvRes = await axios.get("/crime_clusters.csv");
      return normalizeCrimeData(parseCrimeCSV(csvRes.data));
    } catch (fallbackError) {
      console.error("Critical: Both API and fallback CSV failed to load crime data.", fallbackError);
      return [];
    }
  },
};

export default sosService;
