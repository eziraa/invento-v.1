/**
 * Improved Header component with dropdown menu for profile and logout
 */

import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  subtitle,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const handleLogout = async () => {
    setDropdownVisible(false);
    await logout();
    router.replace('/login');
  };

  const handleProfile = () => {
    setDropdownVisible(false);
    router.push('/profile');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View className="bg-primary-600 px-4 py-3 pt-12 pb-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {showBack && (
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-3 p-2 -ml-2"
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Text className="text-white text-xl font-bold" numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text className="text-primary-100 text-xs mt-1" numberOfLines={1}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {user && (
          <View className="relative">
            <TouchableOpacity
              onPress={() => setDropdownVisible(true)}
              className={"flex-row items-center bg-primary-700 rounded-full px-3 py-2 ml-2"}
            >
              <View className="bg-primary-500 w-8 h-8 rounded-full items-center justify-center mr-2">
                <Text className="text-white text-xs font-bold">
                  {getInitials(user.fullName)}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#ffffff" />
            </TouchableOpacity>

            <Modal
              visible={dropdownVisible}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setDropdownVisible(false)}
            >
              <Pressable
                className="flex-1 min-h-screen bg-black/50"
                onPress={() => setDropdownVisible(false)}
              >
                <View className="absolute top-16 right-4 bg-white rounded-xl shadow-2xl min-w-[200px] overflow-hidden">
                  <View className="px-4 py-3 border-b border-gray-200">
                    <Text className="text-gray-900 font-semibold text-base">
                      {user.fullName}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                      {user.email}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={handleProfile}
                    className="flex-row items-center px-4 py-3 border-b border-gray-100 active:bg-gray-50"
                  >
                    <Ionicons name="person" size={20} color="#0284c7" />
                    <Text className="text-gray-900 ml-3 text-base">Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center px-4 py-3 active:bg-gray-50"
                  >
                    <Ionicons name="log-out" size={20} color="#ef4444" />
                    <Text className="text-red-600 ml-3 text-base">Logout</Text>
                  </TouchableOpacity>
                </View>
              </Pressable>
            </Modal>
          </View>
        )}
      </View>
    </View>
  );
};
