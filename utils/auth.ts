/**
 * Authentication utilities for password hashing and verification
 */

import * as Crypto from 'expo-crypto';

/**
 * Hash a password using SHA-256
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
      const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
};

/**
 * Verify a password against a hash
 */
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const passwordHash = await hashPassword(password);
    return passwordHash === hash;
  } catch (error) {
    console.error('Error verifying password:', error);
    return false;
  }
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!password || password.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters long' };
  }
  
  if (password.length > 100) {
    return { valid: false, error: 'Password is too long' };
  }

  return { valid: true };
};

