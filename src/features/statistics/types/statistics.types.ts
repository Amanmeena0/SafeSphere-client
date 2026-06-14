export interface CrimeData {
  id: number;
  state_ut: string;
  district: string;
  year: number;
  total_ipc_crimes: number;
  murder?: number;
  rape?: number;
  theft?: number;
  [key: string]: string | number | undefined;
}

export interface SearchParams {
  state_ut?: string;
  district?: string;
  year?: number;
  limit?: number;
}

export interface StatisticsFilters {
  state: string;
  year: string;
  crimeType: string;
  district: string;
}

export interface DashboardStatistics {
  totalCrimes: number;
  mostCommonCrime: string;
  mostAffectedState: string;
  yearWithHighestCrimes: string;
}
