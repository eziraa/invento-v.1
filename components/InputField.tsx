/**
 * Reusable input field component with error display
 */

import * as React from 'react';
import { TextInput, Text, View } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'decimal-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
  editable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  secureTextEntry = false,
  editable = true,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TextInput
        className={`border rounded-lg px-4 py-3 text-base ${
          error
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 bg-white'
        } ${!editable ? 'bg-gray-100' : ''}`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={!!secureTextEntry}
        editable={!!editable}
      />
      {error && (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      )}
    </View>
  );
};

