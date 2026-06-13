import { useAuth as useClerkAuth, useUser as useClerkUser } from '@clerk/react';
import { useEffect } from 'react';
import { setupInterceptors } from '@/lib/apiClient';

export const useAuth = () => {
  const { isLoaded, isSignedIn, userId, signOut, getToken } = useClerkAuth();

  return {
    isLoaded,
    isSignedIn,
    userId,
    signOut,
    getToken
  };
};

export const useUser = () => {
  const { isLoaded, isSignedIn, user } = useClerkUser();

  return {
    isLoaded,
    isSignedIn,
    user
  };
};

// Component to initialize the interceptor with the token getter
export const AuthTokenInterceptor = () => {
  const { getToken, signOut } = useClerkAuth();

  useEffect(() => {
    setupInterceptors(getToken, signOut);
  }, [getToken, signOut]);

  return null;
};
