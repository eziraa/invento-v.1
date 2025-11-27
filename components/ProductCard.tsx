/**
 * Product card component for displaying product information
 */

import { Product } from '@/types';
import { formatCurrency, formatNumber } from '@/utils/formatting';
import { formatRelativeTime } from '@/utils/time';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const getStockStatus = () => {
    if (product.quantity === 0) {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    if (product.quantity < 10) {
      return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const status = getStockStatus();

  return (
      <TouchableOpacity
      onPress={() => router.push(`/product-detail/${product.id}?productName=${encodeURIComponent(product.name)}`)}
      className="bg-white rounded-xl shadow-md p-4 mb-3 border border-gray-200"
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {product.name}
          </Text>
          <Text className="text-sm text-gray-500 mb-2">SKU: {product.sku}</Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${status.color}`}>
          <Text className="text-xs font-semibold">{status.text}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text className="text-sm text-gray-600">Price</Text>
          <Text className="text-xl font-bold text-primary-600">
            {formatCurrency(product.price)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-600">Quantity</Text>
          <Text className="text-xl font-bold text-gray-900">
            {formatNumber(product.quantity)}
          </Text>
        </View>
      </View>

      <View className="mt-3 pt-3 border-t border-gray-200">
        <Text className="text-xs text-gray-500">
          Updated {formatRelativeTime(product.lastUpdated)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

