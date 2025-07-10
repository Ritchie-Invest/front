import React from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';

interface CustomButtonProps extends IButtonProps {
  variant?: 'primary' | 'secondary' | 'disabled';
  children: React.ReactNode;
}

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'secondary':
        return {
          bg: 'white',
          _text: { color: 'black' },
          borderWidth: 1,
          borderColor: 'gray.300',
        };
      case 'disabled':
        return {
          bg: 'gray.300',
          _text: { color: 'gray.500' },
          _pressed: { bg: 'gray.300' },
        };
      case 'primary':
      default:
        return {
          bg: 'blue.500',
          _text: { color: 'white' },
          _pressed: { bg: 'blue.600' },
        };
    }
  };

  return (
    <NBButton {...getVariantProps()} borderRadius="12" height="50" {...props}>
      {children}
    </NBButton>
  );
};
