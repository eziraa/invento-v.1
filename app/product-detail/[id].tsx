
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { InputField } from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { useTransactions } from '@/hooks/useTransactions';
import { Transaction } from '@/types';
import { formatCurrency, formatNumber } from '@/utils/formatting';
import { formatDateTime } from '@/utils/time';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { getProductById, adjustQuantity, loading } = useProducts();
  const { transactions, currentPage, totalPages, nextPage, previousPage, goToPage } = useTransactions(id);
  const [product, setProduct] = useState<any>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState('');
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    setLoadingProduct(true);
    const productData = await getProductById(id);
    setProduct(productData);
    setLoadingProduct(false);
  };

  const handleAdjustQuantity = async (change: number) => {
    if (!product || !currentUser) {
      Alert.alert('Error', 'User must be logged in to adjust stock');
      return;
    }

    try {
      const updatedProduct = await adjustQuantity(product.id, change, currentUser.id);
      setProduct(updatedProduct);
      setAdjustmentAmount('');
      
      Alert.alert(
        'Success',
        `Stock ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}`
      );
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to adjust quantity'
      );
    }
  };

  const handleCustomAdjustment = async () => {
    const amount = parseInt(adjustmentAmount, 10);
    
    if (isNaN(amount) || amount === 0) {
      Alert.alert('Error', 'Please enter a valid non-zero amount');
      return;
    }

    if (!product) {
      Alert.alert('Error', 'Product not found');
      return;
    }

    if (product.quantity + amount < 0) {
      Alert.alert('Error', 'Quantity cannot go negative');
      return;
    }

    await handleAdjustQuantity(amount);
  };

  if (loadingProduct) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="text-gray-600 mt-4">Loading product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Product Not Found
        </Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const getStockStatus = () => {
    if (product.quantity === 0) {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800 border-red-300' };
    }
    if (product.quantity < 10) {
      return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
    }
    return { text: 'In Stock', color: 'bg-green-100 text-green-800 border-green-300' };
  };

  const status = getStockStatus();

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title={product.name} 
        showBack={true}
        subtitle={`SKU: ${product.sku}`}
      />
      <ScrollView className="flex-1">
      {/* Product Info Card */}
      <View className="bg-white rounded-xl shadow-lg p-6 mb-4 mx-4 mt-4">
        <View className="flex-row justify-between items-start mb-4">
          <View className={`px-3 py-2 rounded-lg border ${status.color}`}>
            <Text className="text-sm font-semibold">{status.text}</Text>
          </View>
          {/* Edit Button */}
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/edit-product', params: { productId: product.id } })}
            className="ml-3 px-3 py-2 bg-primary-600 rounded-lg"
          >
            <Text className="text-white text-sm font-semibold">Edit</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center py-4 border-t border-b border-gray-200 my-4">
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-600 mb-1">Price</Text>
            <Text className="text-2xl font-bold text-primary-600">
              {formatCurrency(product.price)}
            </Text>
          </View>
          <View className="w-px h-12 bg-gray-200" />
          <View className="flex-1 items-center">
            <Text className="text-sm text-gray-600 mb-1">Quantity</Text>
            <Text className="text-2xl font-bold text-gray-900">
              {formatNumber(product.quantity)}
            </Text>
          </View>
        </View>

        <View className="mt-2">
          <Text className="text-xs text-gray-500">
            Last Updated: {formatDateTime(product.lastUpdated)}
          </Text>
        </View>
      </View>

      {/* Stock Adjustment Section */}
      <View className="px-4 mb-4">
        <View className="bg-white rounded-xl shadow-md p-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Adjust Stock
          </Text>

          {!currentUser ? (
            <View className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <Text className="text-yellow-800 text-sm">
                Please register a user to adjust stock levels
              </Text>
            </View>
          ) : (
            <>
              {/* Quick Adjust Buttons */}
              <View className="flex-row mb-4">
                <TouchableOpacity
                  onPress={() => handleAdjustQuantity(-1)}
                  disabled={!!(loading || product.quantity === 0)}
                  className={`flex-1 py-3 rounded-lg items-center mr-2 ${
                    loading || product.quantity === 0
                      ? 'bg-gray-200 opacity-50'
                      : 'bg-red-500'
                  }`}
                >
                  <Text className="text-white text-xl font-bold">-1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAdjustQuantity(1)}
                  disabled={!!loading}
                  className={`flex-1 py-3 rounded-lg items-center mr-2 ${
                    loading ? 'bg-gray-200 opacity-50' : 'bg-green-500'
                  }`}
                >
                  <Text className="text-white text-xl font-bold">+1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAdjustQuantity(-5)}
                  disabled={!!(loading || product.quantity < 5)}
                  className={`flex-1 py-3 rounded-lg items-center mr-2 ${
                    loading || product.quantity < 5
                      ? 'bg-gray-200 opacity-50'
                      : 'bg-red-500'
                  }`}
                >
                  <Text className="text-white text-xl font-bold">-5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAdjustQuantity(5)}
                  disabled={!!loading}
                  className={`flex-1 py-3 rounded-lg items-center ${
                    loading ? 'bg-gray-200 opacity-50' : 'bg-green-500'
                  }`}
                >
                  <Text className="text-white text-xl font-bold">+5</Text>
                </TouchableOpacity>
              </View>

              {/* Custom Adjustment */}
              <View className="mb-4">
                <InputField
                  label="Custom Amount"
                  value={adjustmentAmount}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9-]/g, '');
                    setAdjustmentAmount(cleaned);
                  }}
                  placeholder="Enter amount (+/-)"
                  keyboardType="numeric"
                />
                <Button
                  title="Apply Custom Adjustment"
                  onPress={handleCustomAdjustment}
                  loading={loading}
                  variant="outline"
                  className="mt-2"
                />
              </View>
            </>
          )}
        </View>
      </View>

      {/* Transaction History */}
      <View className="px-4 mb-6">
        <View className="bg-white rounded-xl shadow-md p-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Transaction History
          </Text>

          {transactions.length === 0 ? (
            <Text className="text-gray-500 text-center py-4">
              No transactions yet
            </Text>
          ) : (
            <>
              {transactions.map((transaction: Transaction) => (
                <View
                  key={transaction.id}
                  className="border-b border-gray-200 py-3 last:border-b-0"
                >
                  <View className="flex-row justify-between items-start mb-1">
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-900">
                        {transaction.type === 'create'
                          ? 'Product Created'
                          : transaction.type === 'increase'
                          ? 'Stock Increased'
                          : 'Stock Decreased'}
                      </Text>
                      <Text className="text-sm text-gray-600">
                        {transaction.productName} ({transaction.productSku})
                      </Text>
                    </View>
                    <View
                      className={`px-2 py-1 rounded ${
                        transaction.type === 'increase' || transaction.type === 'create'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          transaction.type === 'increase' || transaction.type === 'create'
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}
                      >
                        {transaction.type === 'increase' || transaction.type === 'create'
                          ? '+'
                          : '-'}
                        {transaction.quantity}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center mt-1">
                    <View className="flex-row items-center">
                      <Text className="text-xs text-gray-500">
                        {transaction.previousQuantity}
                      </Text>
                      <Ionicons name="arrow-forward" size={12} color="#6b7280" style={{ marginHorizontal: 4 }} />
                      <Text className="text-xs text-gray-500">
                        {transaction.newQuantity}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-500">
                      {formatDateTime(transaction.timestamp)}
                    </Text>
                  </View>
                </View>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <View className="mt-4 pt-4 border-t border-gray-200">
                  <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </Text>
                  </View>
                  <View className="flex-row">
                    <TouchableOpacity
                      onPress={previousPage}
                      disabled={!!(currentPage === 1)}
                      className={`flex-1 py-2 rounded-lg mr-2 ${
                        currentPage === 1
                          ? 'bg-gray-200 opacity-50'
                          : 'bg-primary-600'
                      }`}
                    >
                      <Text
                        className={`text-center font-semibold ${
                          currentPage === 1 ? 'text-gray-500' : 'text-white'
                        }`}
                      >
                        Previous
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={nextPage}
                      disabled={!!(currentPage === totalPages)}
                      className={`flex-1 py-2 rounded-lg ${
                        currentPage === totalPages
                          ? 'bg-gray-200 opacity-50'
                          : 'bg-primary-600'
                      }`}
                    >
                      <Text
                        className={`text-center font-semibold ${
                          currentPage === totalPages ? 'text-gray-500' : 'text-white'
                        }`}
                      >
                        Next
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

