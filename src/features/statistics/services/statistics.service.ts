import apiClient from '@/lib/apiClient';
import axios from 'axios';
import { CrimeData, SearchParams } from '../types/statistics.types';

/**
 * Utility to parse local NCRB crime data if API is unavailable.
 * Handles quoted strings correctly.
 */
const parseNCRBCSV = (csvText: string): CrimeData[] => {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',');
  const result: CrimeData[] = [];

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

  // Skip header, process data lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = splitCSVLine(line);
    if (columns.length >= 35) {
      result.push({
        id: i,
        state_ut: columns[1],
        district: columns[2],
        year: parseInt(columns[3]),
        murder: parseInt(columns[4]) || 0,
        rape: parseInt(columns[7]) || 0,
        theft: parseInt(columns[17]) || 0,
        total_ipc_crimes: parseInt(columns[33]) || 0,
        kidnapping_abduction: parseInt(columns[10]) || 0,
        robbery: parseInt(columns[15]) || 0,
        burglary: parseInt(columns[16]) || 0,
        riots: parseInt(columns[20]) || 0,
        cheating: parseInt(columns[22]) || 0,
        counterfeiting: parseInt(columns[23]) || 0,
      });
    }
  }

  return result;
};

export const statisticsService = {
  /**
   * Fetches crime data based on filters
   */
  searchCrimeData: async (params: SearchParams): Promise<CrimeData[]> => {
    try {
      // Primary: Try fetching from the backend API
      const response = await apiClient.get<CrimeData[]>('/api/crime/search', {
        params,
      });
      
      if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
      }
      
      throw new Error('API returned empty or invalid data');
    } catch (error) {
      console.warn('API fetch for statistics failed. Using local fallback...', error);
      
      try {
        // Fallback: Fetch from the local public CSV file
        const csvRes = await axios.get('/crime_data.csv');
        let data = parseNCRBCSV(csvRes.data);
        
        // Apply basic filtering if params are provided (since API would normally do this)
        if (params.state_ut) {
          data = data.filter(item => 
            item.state_ut.toLowerCase().includes(params.state_ut.toLowerCase())
          );
        }
        if (params.district) {
          data = data.filter(item => 
            item.district.toLowerCase().includes(params.district.toLowerCase())
          );
        }
        if (params.year) {
          data = data.filter(item => item.year === params.year);
        }
        
        return data.slice(0, params.limit || 100);
      } catch (fallbackError) {
        console.error('Critical: Failed to load statistics from both API and CSV.', fallbackError);
        return [];
      }
    }
  },
};

export default statisticsService;
