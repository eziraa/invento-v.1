/**
 * Custom hook for managing users
 */

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { userStorage } from '@/utils/storage';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all users
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allUsers = await userStorage.getAll();
      setUsers(allUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Register a new user
  const registerUser = useCallback(async (email: string, fullName: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userStorage.create(email, fullName, password);
      // Reload users from storage to ensure consistency
      await loadUsers();
      setCurrentUser(newUser);
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUsers]);

  // Set current user
  const setUser = useCallback((user: User | null) => {
    setCurrentUser(user);
  }, []);

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    currentUser,
    loading,
    error,
    registerUser,
    setUser,
    loadUsers,
  };
};

