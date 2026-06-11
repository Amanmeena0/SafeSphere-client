import apiClient from '@/lib/apiClient';

export const botService = {
  sendMessage: async (query: string) => {
    const response = await apiClient.post('/api/bot/chat', { query });
    return response.data;
  }
};
