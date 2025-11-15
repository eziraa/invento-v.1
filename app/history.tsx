/**
 * Transaction history screen with pagination
 */

import React, { useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTransactions } from '@/hooks/useTransactions';
import { Pagination } from '@/components/Pagination';
import { Transaction } from '@/types';
import { formatDateTime } from '@/utils/time';
import { Header } from '@/components/Header';

export default function HistoryScreen() {
  const {
    transactions,
    allTransactions,
    loading,
    error,
    currentPage,
    totalPages,
    itemsPerPage,
    nextPage,
    previousPage,
    goToPage,
    loadTransactions,
  } = useTransactions();

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTransactions();
    setRefreshing(false);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'create':
        return <Ionicons name="sparkles" size={24} color="#3b82f6" />;
      case 'increase':
        return <Ionicons name="trending-up" size={24} color="#22c55e" />;
      case 'decrease':
        return <Ionicons name="trending-down" size={24} color="#ef4444" />;
      default:
        return <Ionicons name="document-text" size={24} color="#6b7280" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'create':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'increase':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'decrease':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading && allTransactions.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="text-gray-600 mt-4">Loading transactions...</Text>
      </View>
    );
  }

  if (error && allTransactions.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Text className="text-red-600 text-lg font-semibold mb-4">
          Error loading transactions
        </Text>
        <Text className="text-gray-600 text-center mb-6">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Transaction History" 
        subtitle={`${allTransactions.length} total ${allTransactions.length === 1 ? 'transaction' : 'transactions'}`}
        showBack={true}
      />

      {allTransactions.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="bar-chart" size={64} color="#9ca3af" />
          <Text className="text-xl font-bold text-gray-900 mb-2 mt-4">
            No Transactions Yet
          </Text>
          <Text className="text-gray-600 text-center">
            Transactions will appear here when you add products or adjust stock
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1 px-4 py-4"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {transactions.map((transaction: Transaction) => (
              <View
                key={transaction.id}
                className="bg-white rounded-xl shadow-md p-4 mb-3 border border-gray-200"
              >
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center flex-1">
                    <View className="mr-3">
                      {getTransactionIcon(transaction.type)}
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-gray-900 mb-1">
                        {transaction.productName}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        SKU: {transaction.productSku}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-lg border ${getTransactionColor(
                      transaction.type
                    )}`}
                  >
                    <Text className="text-xs font-semibold">
                      {transaction.type === 'create'
                        ? 'CREATED'
                        : transaction.type === 'increase'
                          ? 'INCREASE'
                          : 'DECREASE'}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <View>
                    <Text className="text-sm text-gray-600">Quantity Change</Text>
                    <Text
                      className={`text-xl font-bold ${transaction.type === 'increase' || transaction.type === 'create'
                        ? 'text-green-600'
                        : 'text-red-600'
                        }`}
                    >
                      {transaction.type === 'increase' || transaction.type === 'create'
                        ? '+'
                        : '-'}
                      {transaction.quantity}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm text-gray-600">Stock Level</Text>
                    <View className="flex-row items-center">
                      <Text className="text-lg font-semibold text-gray-900">
                        {transaction.previousQuantity}
                      </Text>
                      <Ionicons name="arrow-forward" size={14} color="#6b7280" style={{ marginHorizontal: 4 }} />
                      <Text className="text-lg font-semibold text-gray-900">
                        {transaction.newQuantity}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mt-3 pt-3 border-t border-gray-200">
                  <Text className="text-xs text-gray-500">
                    {formatDateTime(transaction.timestamp)}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pagination */}
          {totalPages > 1 && (
            <View className="bg-white border-t border-gray-200 px-4 py-4">
              <View className="mb-2">
                <Text className="text-sm text-gray-600 text-center">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} -{' '}
                  {Math.min(currentPage * itemsPerPage, allTransactions.length)} of{' '}
                  {allTransactions.length} transactions
                </Text>
              </View>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrevious={previousPage}
                onPageSelect={goToPage}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}

