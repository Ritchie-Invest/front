import React, { ReactNode } from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';

type Variant = 'primary' | 'secondary' | 'outline' | 'disabled';

type Props = {
  children: ReactNode;
  onPress: () => void;
  isLoading?: boolean;
  variant?: Variant;
} & Omit<IButtonProps, 'variant'>;

export const Button = ({ children, onPress, isLoading, variant = 'primary', ...rest }: Props) => {
  const colorScheme = 'primary';

  const getVariantProps = () => {
    switch (variant) {
      case 'secondary':
        return {
          bg: 'white',
          _text: { color: 'black' },
          borderWidth: 1,
          borderColor: 'gray.300',
          _pressed: { bg: 'gray.100' },
        };
      case 'disabled':
        return {
          bg: 'gray.300',
          _text: { color: 'gray.500' },
          _pressed: { bg: 'gray.300' },
          isDisabled: true,
        };
      case 'outline':
        return {
          variant: 'outline',
          colorScheme,
        };
      case 'primary':
      default:
        return {
          variant: 'solid',
          colorScheme,
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
