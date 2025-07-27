import React from 'react';
import { Pressable, Box, HStack, VStack } from 'native-base';

interface ListItemProps {
  isSelected?: boolean;
  onPress: () => void;
  left: React.ReactNode;
  right: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ isSelected = false, onPress, left, right }) => {
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
        <HStack justifyContent="space-between" alignItems="center">
          <VStack flex={1} space={1}>
            {left}
          </VStack>
          <VStack alignItems="flex-end" space={1}>
            {right}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
