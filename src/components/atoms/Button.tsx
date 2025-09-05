import React, { ReactNode } from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';

type Variant = 'primary' | 'secondary' | 'outline' | 'disabled' | 'success' | 'error' | 'info';

type Props = {
  children: ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  variant?: Variant;
} & Omit<IButtonProps, 'variant'>;

export const Button = ({ children, onPress, isLoading, variant = 'primary', ...rest }: Props) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'secondary':
        return {
          bg: 'white',
          _text: { color: 'black' },
          borderWidth: 1,
          borderColor: 'gray.300',
          _pressed: { bg: 'gray.100' },
          borderRadius: 16,
        };
      case 'disabled':
        return {
          bg: 'gray.300',
          _text: { color: 'gray.500' },
          _pressed: { bg: 'gray.300' },
          isDisabled: true,
          borderRadius: 16,
        };
      case 'outline':
        return {
          variant: 'outline',
          borderColor: 'blue.500',
          borderRadius: 16,
        };
      case 'success':
        return {
          bg: 'green.600',
          _text: { color: 'white' },
          _pressed: { bg: 'green.700' },
          borderRadius: 16,
        };
      case 'error':
        return {
          bg: 'orange.700',
          _text: { color: 'white' },
          _pressed: { bg: 'orange.800' },
          borderRadius: 16,
        };
      case 'info':
        return {
          bg: 'blue.600',
          _text: { color: 'white' },
          _pressed: { bg: 'blue.700' },
          borderRadius: 16,
        };
      case 'primary':
      default:
        return {
          bg: 'blue.500',
          _text: { color: 'white' },
          _pressed: { bg: 'blue.600' },
          borderRadius: 16,
        };
    }
  };

  return (
    <NBButton
      onPress={onPress}
      isLoading={isLoading}
      rounded="md"
      height="50"
      {...getVariantProps()}
      {...rest}
    >
      {children}
    </NBButton>
  );
};
