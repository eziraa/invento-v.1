/**
 * Type definitions for the Inventory Management App
 */

export interface User {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string; // Encrypted password
  createdAt: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  lastUpdated: string;
  createdBy: string; // User ID
}

export interface Transaction {
  id: string;
  productId: string;
  productSku: string;
  productName: string;
  type: 'increase' | 'decrease' | 'create';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  timestamp: string;
  userId: string;
}

export interface FormErrors {
  [key: string]: string;
}

