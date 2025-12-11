import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';

// ...existing code...
export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: '#0ea5e9' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: (props) => (
              <Text style={{ color: props.color }}>🏠</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="products"
          options={{
            title: 'Products',
            tabBarIcon: (props) => (
              <Text style={{ color: props.color }}>📦</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'Transaction History',
            tabBarIcon: (props) => (
              <Text style={{ color: props.color }}>📊</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: (props) => (
              <Text style={{ color: props.color }}>👤</Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
// ...existing code...