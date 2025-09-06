import React from 'react';
import { Pressable, Box, Text } from 'native-base';

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
            <Text color="white" fontSize="xs" fontWeight="bold">
              Recommandé
            </Text>
          </Box>
        )}
        <Text fontSize="md" fontWeight="medium">
          {title}
        </Text>
      </Box>
    </Pressable>
  );
};
