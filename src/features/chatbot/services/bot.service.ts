import apiClient from '@/lib/apiClient';

export interface BotGenerateResponse {
  task_id: string;
  result?: string;
}

export interface BotStatusResponse {
  task_id: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILURE';
  result: string | null;
}

export const botService = {
  /**
   * Starts the answer generation process.
   * Now synchronous - returns the result immediately.
   * @param query The user's question
   * @returns The final result and a task_id
   */
  generateAnswer: async (query: string): Promise<BotGenerateResponse> => {
    const response = await apiClient.post('/api/bot/generate', { query });
    return response.data;
  },

  /**
   * Polls for the status and the final result of a chatbot task.
   * @param taskId The task_id returned by generateAnswer
   * @returns The status and result of the task
   */
  getTaskStatus: async (taskId: string): Promise<BotStatusResponse> => {
    const response = await apiClient.get(`/api/bot/status/${taskId}`);
    return response.data;
  }
};

export default botService;
