import { storageUtils } from '@/utils/storage';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize AsyncStorage on app start
    const initializeStorage = async () => {
      try {
        await storageUtils.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize storage:', error);
        // Still set initialized to true to allow app to continue
        setIsInitialized(true);
      }
    };

    initializeStorage();
  }, []);

  // Show loading screen while initializing
  if (!isInitialized) {
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
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0ea5e9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Home',
            headerShown: false, 
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login',
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="register-user" 
          options={{ title: 'Register User' }} 
        />
        <Stack.Screen 
          name="add-product" 
          options={{ title: 'Add Product' }} 
        />
        <Stack.Screen 
          name="products" 
          options={{ title: 'Products' }} 
        />
        <Stack.Screen 
          name="product-detail/[id]" 
          options={({ route }: { route: { params?: { productName?: string } } }) => ({ 
            title: route.params?.productName ? `${route.params.productName}` : 'Product Details'
          })}
        />
        <Stack.Screen 
          name="history" 
          options={{ title: 'Transaction History' }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}

