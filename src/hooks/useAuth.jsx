import { useState, useEffect } from 'react';

// Mock user for testing without Clerk
const MOCK_USER = {
  id: 'user_mock_12345',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  primaryEmailAddress: { emailAddress: 'john.doe@example.com' },
  imageUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
  publicMetadata: {
    role: 'civilian', // or 'police'
    profileCompleted: true
  }
};

export const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [userId, setUserId] = useState(MOCK_USER.id);

  return {
    isSignedIn,
    userId,
    signOut: () => setIsSignedIn(false),
  };
};

export const useUser = () => {
  const [user, setUser] = useState(MOCK_USER);

  return {
    isSignedIn: true,
    user,
    isLoaded: true,
  };
};

export const SignedIn = ({ children }) => {
  return <>{children}</>;
};

export const SignedOut = ({ children }) => {
  return null;
};

export const SignOutButton = ({ children }) => {
  return <>{children}</>;
};

export const SignIn = () => {
  return <div>Sign In (Mock)</div>;
};

export const SignUp = () => {
  return <div>Sign Up (Mock)</div>;
};
