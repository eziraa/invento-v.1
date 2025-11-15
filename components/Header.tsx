/**
 * Header component for screens
 */

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightAction,
}) => {
  const router = useRouter();

  return (
    <View className="bg-primary-600 px-4 py-4 pt-12 pb-4 flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        )}
        <Text className="text-white text-xl font-bold">{title}</Text>
      </View>
      {rightAction && (
        <TouchableOpacity
          onPress={rightAction.onPress}
          className="px-3 py-1"
        >
          <Text className="text-white text-base font-semibold">
            {rightAction.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

