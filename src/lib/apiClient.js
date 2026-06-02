import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor will be configured in a provider or hook that has access to Clerk's getToken
export const setupInterceptors = (getToken, signOut) => {
  apiClient.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.warn('Unauthorized (401) response from backend. Verify JWT validation on Flask.');
        // Temporarily disabled redirect to help user debug backend connection
        // if (signOut) await signOut();
        // window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
};

export default apiClient;
