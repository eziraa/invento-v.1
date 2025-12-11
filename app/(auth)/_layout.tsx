import { Stack } from "expo-router";

const headerStyle = {
  backgroundColor: '#0ea5e9',
};

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle,
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="login" 
                options={{ title: 'Login' }} 
            />
            <Stack.Screen 
                name="register" 
                options={{ title: 'Register' }} 
            />
        </Stack>
    )
}