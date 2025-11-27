/**
 * Custom hook for managing products
 */

import { Product } from '@/types';
import { productStorage } from '@/utils/storage';
import { useCallback, useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load all products
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const allProducts = await productStorage.getAll();
      setProducts(allProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  // Get product by ID
  const getProductById = useCallback(async (id: string): Promise<Product | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const product = await productStorage.getById(id);
      return product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new product
  const createProduct = useCallback(async (
    sku: string,
    name: string,
    price: number,
    quantity: number,
    userId: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await productStorage.create(sku, name, price, quantity, userId);
      // Reload products from storage to ensure consistency
      await loadProducts();
      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  // Adjust product quantity
  const adjustQuantity = useCallback(async (
    productId: string,
    change: number,
    userId: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await productStorage.updateQuantity(productId, change, userId);
      // Reload products from storage to ensure consistency
      await loadProducts();
      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to adjust quantity';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateProduct = useCallback(async (updatedProduct: Product) => {
    setLoading(true);
    setError(null);
    try {
      await productStorage.update(updatedProduct.id, updatedProduct);
      await loadProducts();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update product';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    adjustQuantity,
    updateProduct,
  };
};

