import React from 'react';
import { Pressable } from 'react-native';
import { Box, HStack, VStack } from '@gluestack-ui/themed';
import { borderRadius, colors, margins, paddings } from '~/lib/theme/theme';

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
        backgroundColor: colors.alternativeBackgroundColor,
        borderColor: colors.primaryActionColor,
        borderWidth: 2,
      };
    }
    return {
      backgroundColor: colors.mainBackgroundColor,
      borderColor: colors.GreyL20,
      borderWidth: 1,
    };
  };

  return (
    <Pressable onPress={onPress}>
      <Box
        style={[
          getCardStyle(),
          {
            borderRadius: borderRadius.borderRadiusSmall,
            padding: paddings.paddingMedium,
            marginBottom: margins.marginSmall,
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
