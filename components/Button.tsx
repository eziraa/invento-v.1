/**
 * Reusable button component with loading state
 */

import * as React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    fullWidth = true,
    className = '',
}) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return 'bg-primary-600 active:bg-primary-700';
            case 'secondary':
                return 'bg-gray-600 active:bg-gray-700';
            case 'danger':
                return 'bg-red-600 active:bg-red-700';
            case 'outline':
                return 'bg-transparent border-2 border-primary-600 active:bg-primary-50';
            default:
                return 'bg-primary-600 active:bg-primary-700';
        }
    };

    const getTextStyles = () => {
        if (variant === 'outline') {
            return 'text-primary-600';
        }
        return 'text-white';
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={`
        ${getVariantStyles()}
        ${fullWidth ? 'w-full' : ''}
        py-3 px-6 rounded-lg
        flex-row items-center justify-center
        ${disabled || loading ? 'opacity-50' : ''}
        ${className}
      `}
        >
            {loading ? (
                <View className="flex-row items-center">
                    <View className="mr-2">
                        <ActivityIndicator
                            color={variant === 'outline' ? '#0ea5e9' : '#ffffff'}
                            size="small"
                        />
                    </View>
                    <Text className={`${getTextStyles()} font-semibold text-base`}>
                        Loading...
                    </Text>
                </View>
            ) : (
                <Text className={`${getTextStyles()} font-semibold text-base`}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

