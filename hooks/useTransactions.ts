/**
 * Custom hook for managing transactions with pagination
 */

import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/types';
import { transactionStorage } from '@/utils/storage';

const ITEMS_PER_PAGE = 10;

export const useTransactions = (productId?: string) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load all transactions
  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let allTransactions: Transaction[];
      
      if (productId) {
        allTransactions = await transactionStorage.getByProductId(productId);
      } else {
        allTransactions = await transactionStorage.getAll();
      }
      
      setTransactions(allTransactions);
      setFilteredTransactions(allTransactions);
      
      // Calculate total pages
      const pages = Math.ceil(allTransactions.length / ITEMS_PER_PAGE);
      setTotalPages(pages || 1);
      
      // Reset to page 1 if current page is out of bounds
      if (currentPage > pages && pages > 0) {
        setCurrentPage(1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, [productId, currentPage]);

  // Get paginated transactions
  const getPaginatedTransactions = useCallback((): Transaction[] => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, endIndex);
  }, [filteredTransactions, currentPage]);

  // Go to next page
  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Go to previous page
  const previousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  // Go to specific page
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  // Load transactions on mount and when productId changes
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions: getPaginatedTransactions(),
    allTransactions: filteredTransactions,
    loading,
    error,
    currentPage,
    totalPages,
    itemsPerPage: ITEMS_PER_PAGE,
    nextPage,
    previousPage,
    goToPage,
    loadTransactions,
  };
};

