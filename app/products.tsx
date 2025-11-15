/**
 * Products list screen
 */

import * as React from 'react';
import  { useEffect } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';

export default function ProductsScreen() {
  const router = useRouter();
  const { products, loading, error, loadProducts } = useProducts();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="text-gray-600 mt-4">Loading products...</Text>
      </View>
    );
  }

  if (error && products.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Text className="text-red-600 text-lg font-semibold mb-4">
          Error loading products
        </Text>
        <Text className="text-gray-600 text-center mb-6">{error}</Text>
        <Button title="Retry" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Products" 
        subtitle={`${products.length} ${products.length === 1 ? 'product' : 'products'} in inventory`}
        showBack={true}
      />

      {products.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <Ionicons name="cube-outline" size={80} color="#9ca3af" />
          <Text className="text-xl font-bold text-gray-900 mb-2 mt-4">
            No Products Yet
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            Start by adding your first product to the inventory
          </Text>
          <Button
            title="Add Product"
            onPress={() => router.push('/add-product')}
          />
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-4 py-4"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

