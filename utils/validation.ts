/**
 * Validation utilities for form inputs
 */

import { FormErrors } from '@/types';

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validates full name (at least 2 characters, letters and spaces only)
 */
export const validateFullName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return name.trim().length >= 2 && nameRegex.test(name.trim());
};

/**
 * Validates SKU (alphanumeric, 3-20 characters)
 */
export const validateSku = (sku: string): boolean => {
  const skuRegex = /^[a-zA-Z0-9]{3,20}$/;
  return skuRegex.test(sku.trim());
};

/**
 * Validates product name (at least 2 characters)
 */
export const validateProductName = (name: string): boolean => {
  return name.trim().length >= 2;
};

/**
 * Validates price (positive number)
 */
export const validatePrice = (price: string): boolean => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0;
};

/**
 * Validates quantity (non-negative integer)
 */
export const validateQuantity = (quantity: string): boolean => {
  const numQuantity = parseInt(quantity, 10);
  return !isNaN(numQuantity) && numQuantity >= 0;
};

/**
 * Validates user registration form
 */
export const validateUserForm = (email: string, fullName: string): FormErrors => {
  const errors: FormErrors = {};

  if (!email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (!validateFullName(fullName)) {
    errors.fullName = 'Full name must be at least 2 characters and contain only letters';
  }

  return errors;
};

/**
 * Validates product registration form
 */
export const validateProductForm = (
  sku: string,
  name: string,
  price: string,
  quantity: string
): FormErrors => {
  const errors: FormErrors = {};

  if (!sku.trim()) {
    errors.sku = 'SKU is required';
  } else if (!validateSku(sku)) {
    errors.sku = 'SKU must be 3-20 alphanumeric characters';
  }

  if (!name.trim()) {
    errors.name = 'Product name is required';
  } else if (!validateProductName(name)) {
    errors.name = 'Product name must be at least 2 characters';
  }

  if (!price.trim()) {
    errors.price = 'Price is required';
  } else if (!validatePrice(price)) {
    errors.price = 'Price must be a positive number';
  }

  if (!quantity.trim()) {
    errors.quantity = 'Quantity is required';
  } else if (!validateQuantity(quantity)) {
    errors.quantity = 'Quantity must be a non-negative integer';
  }

  return errors;
};

