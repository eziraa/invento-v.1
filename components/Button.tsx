/**
 * Reusable button component with loading state
 */

import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

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
    // Ensure boolean props are explicitly boolean
    const isDisabled = !!(disabled || loading);
    const isLoading = !!loading;
    const isFullWidth = !!fullWidth;
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

    const classNameString = className || '';
    const finalClassName = `${getVariantStyles()} ${isFullWidth ? 'w-full' : ''} py-3 px-6 rounded-lg flex-row items-center justify-center ${isDisabled ? 'opacity-50' : ''} ${classNameString}`.trim();

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isDisabled}
            className={finalClassName}
        >
            {isLoading ? (
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

