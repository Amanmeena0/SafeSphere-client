import apiClient from '@/lib/apiClient';
import { CrimeData } from '../types/statistics.types';

export const statisticsService = {
  searchCrimeData: async (state_ut: string): Promise<CrimeData[]> => {
    const response = await apiClient.get<CrimeData[]>('/api/search', {
      params: { state_ut },
    });
    return response.data;
  },
};

export default statisticsService;
