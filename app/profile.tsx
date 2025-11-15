/**
 * User Profile Screen
 */

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { formatDateTime } from '@/utils/time';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Text className="text-xl font-bold text-gray-900 mb-4">
          Not Logged In
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Please login to view your profile
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="bg-primary-600 px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Header title="Profile" showBack={true} />

      <ScrollView className="flex-1">
        {/* Profile Header Card */}
        <View className="bg-white mx-4 mt-4 rounded-xl shadow-md p-6 items-center">
          <View className="bg-primary-600 w-24 h-24 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-3xl font-bold">
              {getInitials(user.fullName)}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {user.fullName}
          </Text>
          <Text className="text-gray-500 text-base mb-4">{user.email}</Text>
          <View className="bg-primary-50 px-4 py-2 rounded-full">
            <Text className="text-primary-700 text-sm font-semibold">
              Active User
            </Text>
          </View>
        </View>

        {/* Account Information */}
        <View className="mx-4 mt-4 bg-white rounded-xl shadow-md overflow-hidden">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <Text className="text-gray-700 font-semibold text-base">
              Account Information
            </Text>
          </View>

          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={20} color="#6b7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-xs mb-1">Full Name</Text>
                <Text className="text-gray-900 text-base font-medium">
                  {user.fullName}
                </Text>
              </View>
            </View>
          </View>

          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#6b7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-xs mb-1">Email Address</Text>
                <Text className="text-gray-900 text-base font-medium">
                  {user.email}
                </Text>
              </View>
            </View>
          </View>

          <View className="px-4 py-3">
            <View className="flex-row items-center">
              <Ionicons name="key-outline" size={20} color="#6b7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-500 text-xs mb-1">User ID</Text>
                <Text className="text-gray-900 text-base font-medium">
                  {user.id}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-4 mt-4 bg-white rounded-xl shadow-md overflow-hidden">
          <View className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <Text className="text-gray-700 font-semibold text-base">
              Quick Actions
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/products')}
            className="flex-row items-center px-4 py-4 border-b border-gray-100 active:bg-gray-50"
          >
            <Ionicons name="cube-outline" size={24} color="#0284c7" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 text-base font-medium">
                View Products
              </Text>
              <Text className="text-gray-500 text-sm">
                Browse all inventory items
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/history')}
            className="flex-row items-center px-4 py-4 border-b border-gray-100 active:bg-gray-50"
          >
            <Ionicons name="bar-chart-outline" size={24} color="#0284c7" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 text-base font-medium">
                Transaction History
              </Text>
              <Text className="text-gray-500 text-sm">
                View all stock changes
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/add-product')}
            className="flex-row items-center px-4 py-4 active:bg-gray-50"
          >
            <Ionicons name="add-circle-outline" size={24} color="#0284c7" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-900 text-base font-medium">
                Add Product
              </Text>
              <Text className="text-gray-500 text-sm">
                Register a new product
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mx-4 mt-4 mb-6 bg-red-50 border border-red-200 rounded-xl px-4 py-4 flex-row items-center justify-center active:bg-red-100"
        >
          <Ionicons name="log-out" size={20} color="#ef4444" />
          <Text className="text-red-600 font-semibold text-base ml-2">
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

