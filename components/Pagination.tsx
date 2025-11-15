/**
 * Pagination component for transaction history
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageSelect?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageSelect,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <View className="flex-row items-center justify-center py-4">
      <TouchableOpacity
        onPress={onPrevious}
        disabled={!!(currentPage === 1)}
        className={`px-4 py-2 rounded-lg mr-2 ${
          currentPage === 1
            ? 'bg-gray-200 opacity-50'
            : 'bg-primary-600 active:bg-primary-700'
        }`}
      >
        <Text
          className={`font-semibold ${
            currentPage === 1 ? 'text-gray-500' : 'text-white'
          }`}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <View className="flex-row items-center">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <Text key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </Text>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <TouchableOpacity
              key={pageNum}
              onPress={() => onPageSelect?.(pageNum)}
              className={`px-3 py-2 mx-1 rounded-lg ${
                isActive
                  ? 'bg-primary-600'
                  : 'bg-gray-200 active:bg-gray-300'
              }`}
            >
              <Text
                className={`font-semibold ${
                  isActive ? 'text-white' : 'text-gray-700'
                }`}
              >
                {pageNum}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        onPress={onNext}
        disabled={!!(currentPage === totalPages)}
        className={`px-4 py-2 rounded-lg ml-2 ${
          currentPage === totalPages
            ? 'bg-gray-200 opacity-50'
            : 'bg-primary-600 active:bg-primary-700'
        }`}
      >
        <Text
          className={`font-semibold ${
            currentPage === totalPages ? 'text-gray-500' : 'text-white'
          }`}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

