import apiClient from '@/lib/apiClient';
import { CrimeData, SearchParams } from '../types/statistics.types';

export const statisticsService = {
  /**
   * Fetches crime data based on filters
   */
  searchCrimeData: async (params: SearchParams): Promise<CrimeData[]> => {
    const response = await apiClient.get<CrimeData[]>('/api/search', {
      params,
    });
    return response.data;
  },
};

export default statisticsService;
