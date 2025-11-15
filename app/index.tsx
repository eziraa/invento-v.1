/**
 * Home screen - Main navigation hub
 */

import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

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
       
          <Text className="text-primary-100 text-sm mt-2">
            Please login to continue
          </Text>
       
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

        
      </ScrollView>
    </View>
  );
}

