import React from 'react';
import { Box, IBoxProps } from 'native-base';

interface CardProps extends IBoxProps {
  variant?: 'default' | 'chapter' | 'lesson';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ variant = 'default', children, ...props }) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'chapter':
        return {
          bg: 'green.400',
          p: 4,
          rounded: 'xl',
          shadow: 1,
        };
      case 'lesson':
        return {
          bg: 'green.50',
          p: 4,
          rounded: 'lg',
          borderWidth: 1,
          borderColor: 'green.200',
        };
      case 'default':
      default:
        return {
          bg: 'white',
          p: 4,
          rounded: 'lg',
        };
    }
  };

  return (
    <Box {...getVariantProps()} {...props}>
      {children}
    </Box>
  );
};
