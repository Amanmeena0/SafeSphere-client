import apiClient from '@/lib/apiClient';

export interface UserProfile {
  id?: string;
  clerk_id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  emergency_contact?: string;
  blood_group?: string;
  created_at?: string;
  updated_at?: string;
}

export const profileService = {
  /**
   * Get current logged-in user details
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/api/profile/me');
    return response.data;
  },

  /**
   * Update profile information
   */
  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.put('/api/profile/me', data);
    return response.data;
  },

  /**
   * Quick check if profile exists/completed
   */
  checkProfile: async (): Promise<{ exists: boolean; completed: boolean }> => {
    const response = await apiClient.get('/api/profile/check');
    return response.data;
  },

  /**
   * Fetch all FIRs filed by the current user
   */
  getUserFirs: async (): Promise<any> => {
    const response = await apiClient.get('/api/profile/firs');
    return response.data;
  },

  /**
   * Fetch all SOS reports triggered by the current user
   */
  getUserSos: async (): Promise<any[]> => {
    const response = await apiClient.get('/api/profile/sos');
    return response.data;
  },

  /**
   * Manual user registration
   */
  registerProfile: async (data: UserProfile): Promise<UserProfile> => {
    const response = await apiClient.post('/api/profile/register', data);
    return response.data;
  }
};

export default profileService;
