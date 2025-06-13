import React from 'react';
import { Button as NBButton, IButtonProps } from 'native-base';

interface CustomButtonProps extends IButtonProps {
  variant?: 'primary' | 'secondary';
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
      case 'primary':
      default:
        return {
          bg: 'black',
          _text: { color: 'white' },
        };
    }
  };

  return (
    <NBButton {...getVariantProps()} {...props}>
      {children}
    </NBButton>
  );
};
