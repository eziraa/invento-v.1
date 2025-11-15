/**
 * Persistent storage utilities using AsyncStorage
 * Simulates backend API behavior with local persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Product, Transaction } from '@/types';
import { hashPassword, verifyPassword } from '@/utils/auth';

// Storage keys
const STORAGE_KEYS = {
  USERS: '@inventory_app:users',
  PRODUCTS: '@inventory_app:products',
  TRANSACTIONS: '@inventory_app:transactions',
  AUTH_TOKEN: '@inventory_app:auth_token',
  CURRENT_USER: '@inventory_app:current_user',
} as const;

/**
 * Generates a unique ID
 */
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Helper function to get data from AsyncStorage
 */
const getStorageData = async <T>(key: string, defaultValue: T[]): Promise<T[]> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T[];
    }
    return defaultValue;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Helper function to save data to AsyncStorage
 */
const saveStorageData = async <T>(key: string, data: T[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw new Error(`Failed to save data to ${key}`);
  }
};

/**
 * User storage operations
 */
export const userStorage = {
  /**
   * Get all users
   */
  getAll: async (): Promise<User[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return await getStorageData<User>(STORAGE_KEYS.USERS, []);
  },

  /**
   * Create a new user with password
   */
  create: async (email: string, fullName: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const users = await getStorageData<User>(STORAGE_KEYS.USERS, []);
    
    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    const newUser: User = {
      id: generateId(),
      email: email.trim(),
      fullName: fullName.trim(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    // Add new user and save
    users.push(newUser);
    await saveStorageData(STORAGE_KEYS.USERS, users);
    
    return newUser;
  },

  /**
   * Authenticate user with email and password
   */
  authenticate: async (email: string, password: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const users = await getStorageData<User>(STORAGE_KEYS.USERS, []);
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    return user;
  },

  /**
   * Get user by ID
   */
  getById: async (id: string): Promise<User | undefined> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    const users = await getStorageData<User>(STORAGE_KEYS.USERS, []);
    return users.find(u => u.id === id);
  },

  /**
   * Update user (if needed in future)
   */
  update: async (id: string, updates: Partial<User>): Promise<User> => {
    const users = await getStorageData<User>(STORAGE_KEYS.USERS, []);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    await saveStorageData(STORAGE_KEYS.USERS, users);
    
    return users[userIndex];
  },
};

/**
 * Authentication storage operations
 */
export const authStorage = {
  /**
   * Save authentication token and user
   */
  saveAuth: async (user: User, token: string): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token),
        AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user)),
      ]);
    } catch (error) {
      console.error('Error saving auth:', error);
      throw new Error('Failed to save authentication');
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (userData) {
        return JSON.parse(userData) as User;
      }
      return null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  /**
   * Get authentication token
   */
  getAuthToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  },

  /**
   * Clear authentication data (logout)
   */
  clearAuth: async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER),
      ]);
    } catch (error) {
      console.error('Error clearing auth:', error);
      throw new Error('Failed to clear authentication');
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const user = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return !!(token && user);
    } catch (error) {
      return false;
    }
  },
};

/**
 * Storage utility functions
 */
export const storageUtils = {
  /**
   * Clear all storage (useful for testing/reset)
   */
  clearAll: async (): Promise<void> => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.USERS),
        AsyncStorage.removeItem(STORAGE_KEYS.PRODUCTS),
        AsyncStorage.removeItem(STORAGE_KEYS.TRANSACTIONS),
        AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN),
        AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER),
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw new Error('Failed to clear storage');
    }
  },

  /**
   * Get storage size (for debugging)
   */
  getStorageInfo: async (): Promise<{
    users: number;
    products: number;
    transactions: number;
  }> => {
    const [users, products, transactions] = await Promise.all([
      getStorageData<User>(STORAGE_KEYS.USERS, []),
      getStorageData<Product>(STORAGE_KEYS.PRODUCTS, []),
      getStorageData<Transaction>(STORAGE_KEYS.TRANSACTIONS, []),
    ]);

    return {
      users: users.length,
      products: products.length,
      transactions: transactions.length,
    };
  },

  /**
   * Initialize storage with default data (optional)
   */
  initialize: async (): Promise<void> => {
    try {
      // Check if storage is already initialized
      const users = await getStorageData<User>(STORAGE_KEYS.USERS, []);
      
      // If storage is empty, you could add default data here
      // For now, we'll just ensure storage keys exist
      if (users.length === 0) {
        await saveStorageData(STORAGE_KEYS.USERS, []);
        await saveStorageData(STORAGE_KEYS.PRODUCTS, []);
        await saveStorageData(STORAGE_KEYS.TRANSACTIONS, []);
      }
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  },
};
