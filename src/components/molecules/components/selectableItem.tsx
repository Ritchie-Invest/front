import React from 'react';
import { Pressable, Box, Text } from '@gluestack-ui/themed';

interface SelectableItemProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
  variant?: 'default' | 'recommended';
}

export const SelectableItem: React.FC<SelectableItemProps> = ({
  title,
  isSelected = false,
  onPress,
  variant = 'default',
}) => {
  const getCardStyle = () => {
    if (isSelected) {
      return {
        bg: 'blue.50',
        borderColor: 'blue.500',
        borderWidth: 2,
      };
    }
    return {
      bg: 'white',
      borderColor: 'gray.200',
      borderWidth: 1,
    };
  };

  return (
    <Pressable onPress={onPress}>
      <Box {...getCardStyle()} borderRadius="12" p="4" mb="3" position="relative">
        {variant === 'recommended' && (
          <Box position="absolute" top="-8" right="4" bg="blue.500" px="3" py="1" borderRadius="12">
            <Text color="white" fontSize={12} fontWeight="bold">
              Recommandé
            </Text>
          </Box>
        )}
        <Text fontSize={16} fontWeight="medium">
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};
