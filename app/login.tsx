

import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';
import { FormErrors } from '@/types';
import { validateEmail } from '@/utils/validation';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleLogin = async () => {
    // Validate form
    const validationErrors: FormErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      Alert.alert('Logging In', 'Please wait while we log you in...');
      await login(email, password);
      // Navigation will happen automatically via useEffect
      router.replace('/');
      Alert.alert('Login Successful', 'You have been logged in successfully.');
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error instanceof Error ? error.message : 'Invalid email or password'
      );
    }
  };

  const handleRegister = () => {
    router.push('/register-user');
  };

  if (loading && isAuthenticated) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="flex-1 justify-center">
          <View className="mb-8 items-center">
            <Text className="text-4xl font-bold text-primary-600 mb-2">
              Invento
            </Text>
            <Text className="text-gray-600 text-center">
              Sign in to continue
            </Text>
          </View>

          <View className="bg-white rounded-xl shadow-md p-6 mb-4">
            <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Login
            </Text>

            <InputField
              label="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }}
              placeholder="user@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) {
                  setErrors(prev => ({ ...prev, password: '' }));
                }
              }}
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
            />

            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              className="mt-4"
            />
          </View>

          <View className="bg-white rounded-xl shadow-md p-6">
            <Text className="text-gray-600 text-center mb-4">
              Don&apos;t have an account?
            </Text>
            <Button
              title="Create Account"
              onPress={handleRegister}
              variant="outline"
              loading={false}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

