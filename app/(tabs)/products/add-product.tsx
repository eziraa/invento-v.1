

import { Button } from '@/components/Button';
import { InputField } from '@/components/InputField';
import { useAuth } from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import { FormErrors } from '@/types';
import { validateProductForm } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';

export default function AddProductScreen() {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { createProduct, loading } = useProducts();
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  // Check if user is logged in
  if (!currentUser) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
          User Required
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          Please register a user before adding products
        </Text>
        <Button
          title="Go to Register User"
          onPress={() => router.push('/register-user')}
        />
      </View>
    );
  }

  const handleSubmit = async () => {
    // Validate form
    const validationErrors = validateProductForm(sku, name, price, quantity);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await createProduct(
        sku,
        name,
        parseFloat(price),
        parseInt(quantity, 10),
        currentUser.id
      );
      
      Alert.alert(
        'Success',
        'Product added successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setSku('');
              setName('');
              setPrice('');
              setQuantity('');
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Failed to add product'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-gray-50"
    >
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 24 }}>
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Add New Product
          </Text>
          <Text className="text-gray-600">
            Register a new product in the inventory system
          </Text>
        </View>

        <View className="bg-white rounded-xl shadow-md p-6 mb-4">
          <InputField
            label="SKU (Stock Keeping Unit)"
            value={sku}
            onChangeText={(text) => {
              setSku(text.toUpperCase());
              if (errors.sku) {
                setErrors(prev => ({ ...prev, sku: '' }));
              }
            }}
            placeholder="ABC123"
            error={errors.sku}
          />

          <InputField
            label="Product Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) {
                setErrors(prev => ({ ...prev, name: '' }));
              }
            }}
            placeholder="Product Name"
            autoCapitalize="words"
            error={errors.name}
          />

          <InputField
            label="Price (ETB)"
            value={price}
            onChangeText={(text) => {
              // Allow only numbers and one decimal point
              const cleaned = text.replace(/[^0-9.]/g, '');
              const parts = cleaned.split('.');
              if (parts.length <= 2) {
                setPrice(cleaned);
              }
              if (errors.price) {
                setErrors(prev => ({ ...prev, price: '' }));
              }
            }}
            placeholder="0.00"
            keyboardType="decimal-pad"
            error={errors.price}
          />

          <InputField
            label="Initial Quantity"
            value={quantity}
            onChangeText={(text) => {
              // Allow only integers
              const cleaned = text.replace(/[^0-9]/g, '');
              setQuantity(cleaned);
              if (errors.quantity) {
                setErrors(prev => ({ ...prev, quantity: '' }));
              }
            }}
            placeholder="0"
            keyboardType="numeric"
            error={errors.quantity}
          />

          <Button
            title="Add Product"
            onPress={handleSubmit}
            loading={loading}
            className="mt-4"
          />
        </View>

        <View className="bg-green-50 rounded-xl p-4 border border-green-200">
          <Text className="text-green-800 text-sm">
            <Text className="font-semibold">Tip:</Text> SKU must be unique. The system will automatically convert it to uppercase.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

