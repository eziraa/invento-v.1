/**
 * Home screen - Main navigation hub
 */

import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';

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

  const menuItems: Array<{
    title: string;
    description: string;
    route: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
  }> = [
    {
      title: 'Add Product',
      description: 'Register a new product',
      route: '/add-product',
      icon: 'add-circle',
      color: 'bg-green-500',
    },
    {
      title: 'View Products',
      description: 'Browse all products',
      route: '/products',
      icon: 'list',
      color: 'bg-purple-500',
    },
    {
      title: 'Transaction History',
      description: 'View all stock changes',
      route: '/history',
      icon: 'bar-chart',
      color: 'bg-orange-500',
    },
  ];


  return (
    <View className="flex-1 bg-gray-50">
      <Header 
        title="Invento" 
        subtitle={user ? `Welcome, ${user.fullName}` : undefined}
      />

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
                    <Ionicons name={item.icon} size={32} color="#ffffff" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 mb-1">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {item.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
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

