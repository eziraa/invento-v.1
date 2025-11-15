/**
 * Home screen - Main navigation hub
 */

import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/Button';

export default function HomeScreen() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      title: 'Add Product',
      description: 'Register a new product',
      route: '/add-product',
      icon: '📦',
      color: 'bg-green-500',
    },
    {
      title: 'View Products',
      description: 'Browse all products',
      route: '/products',
      icon: '📋',
      color: 'bg-purple-500',
    },
    {
      title: 'Transaction History',
      description: 'View all stock changes',
      route: '/history',
      icon: '📊',
      color: 'bg-orange-500',
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header Section */}
      <View className="bg-primary-600 px-6 pt-16 pb-8">
        <Text className="text-white text-3xl font-bold mb-2">
          Inventory Management
        </Text>
        {user ? (
          <View className="mt-2">
            <Text className="text-primary-100 text-sm">Logged in as:</Text>
            <Text className="text-white text-lg font-semibold">
              {user.fullName}
            </Text>
            <Text className="text-primary-100 text-sm">{user.email}</Text>
            <TouchableOpacity
              onPress={async () => {
                await logout();
                router.replace('/login');
              }}
              className="mt-2 self-start"
            >
              <Text className="text-primary-200 text-sm underline">Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-primary-100 text-sm mt-2">
            Please login to continue
          </Text>
        )}
      </View>

      {/* Menu Grid */}
      <ScrollView className="flex-1 px-4 py-6">
        <View>
          {menuItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => router.push(item.route as any)}
                className="bg-white rounded-xl shadow-md p-6 mb-4"
              >
                <View className="flex-row items-center">
                  <View className={`${item.color} w-16 h-16 rounded-full items-center justify-center mr-4`}>
                    <Text className="text-3xl">{item.icon}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 mb-1">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {item.description}
                    </Text>
                  </View>
                  <Text className="text-gray-400 text-2xl">→</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Stats */}
        {user && (
          <View className="mt-6 bg-white rounded-xl shadow-md p-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </Text>
            <View className="flex-row">
              <View className="flex-1 mr-2">
                <Button
                  title="Add Product"
                  onPress={() => router.push('/add-product')}
                  variant="primary"
                  fullWidth={true}
                />
              </View>
              <View className="flex-1 ml-2">
                <Button
                  title="View Products"
                  onPress={() => router.push('/products')}
                  variant="outline"
                  fullWidth={true}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

