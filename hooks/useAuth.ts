/**
 * Custom hook for authentication
 */

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { userStorage, authStorage } from '@/utils/storage';
import * as Crypto from 'expo-crypto';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Generate a simple auth token
   */
  const generateToken = async (): Promise<string> => {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${Date.now()}-${Math.random()}`
    );
  };

  /**
   * Check if user is already authenticated
   */
  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const authenticated = await authStorage.isAuthenticated();
      if (authenticated) {
        const currentUser = await authStorage.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      }
    } catch (err) {
      console.error('Error checking auth:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login with email and password
   */
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const authenticatedUser = await userStorage.authenticate(email, password);
      const token = await generateToken();
      
      await authStorage.saveAuth(authenticatedUser, token);
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      
      return authenticatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Register a new user
   */
  const register = useCallback(async (
    email: string,
    fullName: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userStorage.create(email, fullName, password);
      const token = await generateToken();
      
      await authStorage.saveAuth(newUser, token);
      setUser(newUser);
      setIsAuthenticated(true);
      
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authStorage.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Error logging out:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Check auth status on mount
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };
};

