
import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';
import { FormErrors } from '@/types';
import { validatePassword } from '@/utils/auth';
import { validateUserForm } from '@/utils/validation';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function RegisterUserScreen() {
  const router = useRouter();
  const { register, loading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && !loading) {
      router.replace('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async () => {
    // Validate form
    const validationErrors = validateUserForm(email, fullName);
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      validationErrors.password = passwordValidation.error || 'Invalid password';
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await register(email, fullName, password);
      // Navigation will happen automatically via useEffect
      router.replace('/');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to register user'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Register New User
          </Text>
          <Text className="text-gray-600">
            Create an account to manage products and track inventory
          </Text>
        </View>

        <View className="bg-white rounded-xl shadow-md shadow-gray-500/20 p-6 mb-4">
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
            error={errors.email}
          />

          <InputField
            label="Full Name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) {
                setErrors(prev => ({ ...prev, fullName: '' }));
              }
            }}
            placeholder="John Doe"
            autoCapitalize="words"
            error={errors.fullName}
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
            placeholder="Enter password (min 6 characters)"
            secureTextEntry
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword) {
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }
            }}
            placeholder="Confirm your password"
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title="Create Account"
            onPress={handleSubmit}
            loading={loading}
            className="mt-4"
          />
        </View>

        <View className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <Text className="text-blue-800 text-sm">
            <Text className="font-semibold">Note:</Text> You need to register a user before you can add products to the inventory.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

