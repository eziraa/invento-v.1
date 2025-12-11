import { storageUtils } from '@/utils/storage';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const initializeStorage = async () => {
      try {
        await storageUtils.initialize();
        const token = await storageUtils.get('authToken'); // adjust to your key
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Failed to initialize storage:', error);
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeStorage();
  }, []);

  if (!isInitialized || isAuthenticated === null) {
    return (
      <SafeAreaProvider>
        <View className="flex-1 items-center justify-center bg-gray-50">
          <ActivityIndicator size="large" color="#0ea5e9" />
          <Text className="text-gray-600 mt-4">Initializing...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // Show the tabs group; this will render app/(tabs)/_layout.tsx
          <Stack.Screen name="(tabs)" />
        ) : (
          // Show the auth group; these screens are NOT in the tab bar
          <Stack.Screen name="(auth)" />
        )}
      </Stack>
    </SafeAreaProvider>
  );
}