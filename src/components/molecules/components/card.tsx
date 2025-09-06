import React from 'react';
import { Box } from '@gluestack-ui/themed';
import { ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'default' | 'chapter' | 'lesson';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ variant = 'default', children, style, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'chapter':
        return {
          backgroundColor: '#4ade80', // green.400
          padding: 16,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        };
      case 'lesson':
        return {
          backgroundColor: '#f0fdf4', // green.50
          padding: 16,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#bbf7d0', // green.200
        };
      case 'default':
      default:
        return {
          backgroundColor: '#f9fafb', // gray.50
          padding: 16,
          borderRadius: 8,
        };
    }
  };

  return (
    <Box style={[getVariantStyles(), style]} {...props}>
      {children}
    </Box>
  );
};
