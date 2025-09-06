import React from 'react';
import { Pressable } from 'react-native';
import { Box, HStack, VStack } from '@gluestack-ui/themed';

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
        backgroundColor: '#eff6ff', // blue.50
        borderColor: '#3b82f6', // blue.500
        borderWidth: 2,
      };
    }
    return {
      backgroundColor: '#ffffff', // white
      borderColor: '#e5e7eb', // gray.200
      borderWidth: 1,
    };
  };

  return (
    <Pressable onPress={onPress}>
      <Box
        style={[
          getCardStyle(),
          {
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            position: 'relative',
          },
        ]}
      >
        <HStack justifyContent="space-between" alignItems="center">
          <VStack flex={1} space="xs">
            {left}
          </VStack>
          <VStack alignItems="flex-end" space="xs">
            {right}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
