import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

let requestInterceptor = null;
let responseInterceptor = null;

// Interceptor will be configured in a provider or hook that has access to Clerk's getToken
export const setupInterceptors = (getToken, signOut) => {
  // Clear existing interceptors to avoid stacking
  if (requestInterceptor !== null) {
    apiClient.interceptors.request.eject(requestInterceptor);
  }
  if (responseInterceptor !== null) {
    apiClient.interceptors.response.eject(responseInterceptor);
  }

  requestInterceptor = apiClient.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.debug('No auth token available for request to:', config.url);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
    return config;
  });

  responseInterceptor = apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized (401) response from backend. This usually means the user is not logged in or the token has expired.');
        // Optionally trigger a sign out or redirect to login if we know for sure it's an auth issue
      }
      return Promise.reject(error);
    }
  );
};

export default apiClient;
