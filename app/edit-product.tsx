import { Header } from '@/components/Header';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
// If you use Expo Router; adjust if not
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditProductScreen() {
  const router = useRouter();
  const { productId } = useLocalSearchParams<{ productId?: string }>();

  const {
    getProductById,
    updateProduct,
    loading,
    error,
  } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [saving, setSaving] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const load = async () => {
      try {
        const p = await getProductById(productId);
        if (!p) {
          setLocalError('Product not found.');
          return;
        }
        setProduct(p);
        setName(p.name);
        setSku(p.sku);
        setQuantity(String(p.quantity));
      } catch (e: any) {
        setLocalError(e?.message || 'Failed to load product.');
      }
    };

    load();
  }, [productId]);

  const handleSave = async () => {
    if (!product) return;

    if (!name.trim() || !sku.trim() || !quantity.trim()) {
      setLocalError('Please fill in all fields.');
      return;
    }

    const parsedQty = Number(quantity);
    if (Number.isNaN(parsedQty) || parsedQty < 0) {
      setLocalError('Quantity must be a non-negative number.');
      return;
    }

    try {
      setSaving(true);
      setLocalError(null);

      await updateProduct({
        ...product,
        name: name.trim(),
        sku: sku.trim(),
        quantity: parsedQty,
      });

      router.back();
    } catch (e: any) {
      setLocalError(e?.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading && !product) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text className="text-gray-600 mt-4">Loading product...</Text>
      </View>
    );
  }

  if ((error || localError) && !product) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-6">
        <Ionicons name="alert-circle" size={56} color="#ef4444" />
        <Text className="text-red-600 text-lg font-semibold mb-4 mt-4">
          Error loading product
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          {localError || error}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Header
        title="Edit Product"
        subtitle={product?.sku ? `SKU: ${product.sku}` : undefined}
        showBack={true}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1 px-4 py-4"
          keyboardShouldPersistTaps="handled"
        >
          {localError && (
            <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex-row">
              <Ionicons name="alert-circle" size={20} color="#b91c1c" />
              <Text className="ml-2 text-sm text-red-700 flex-1">{localError}</Text>
            </View>
          )}

          {/* Name */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              Product Name
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter product name"
              className="bg-white rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900"
            />
          </View>

          {/* SKU */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              SKU
            </Text>
            <TextInput
              value={sku}
              onChangeText={setSku}
              placeholder="Enter product SKU"
              autoCapitalize="characters"
              className="bg-white rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900"
            />
          </View>

          {/* Quantity */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-1">
              Stock Quantity
            </Text>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              placeholder="0"
              keyboardType="numeric"
              className="bg-white rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900"
            />
          </View>

          {/* Actions */}
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => router.back()}
              disabled={saving}
              className="flex-1 mr-2 bg-gray-100 rounded-lg py-3 items-center justify-center border border-gray-300"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              className={`flex-1 ml-2 rounded-lg py-3 items-center justify-center ${
                saving ? 'bg-sky-300' : 'bg-sky-500'
              }`}
            >
              {saving ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <View className="flex-row items-center">
                  <Ionicons name="save" size={18} color="#ffffff" />
                  <Text className="text-white font-semibold ml-2">
                    Save Changes
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}