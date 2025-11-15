/**
 * Formatting utilities for display
 */

/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('am-ET', {
    style: 'currency',
    currency: 'ETB',
  }).format(amount);
};

/**
 * Formats a number with thousand separators
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

