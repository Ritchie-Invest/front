import React from 'react';
import { Pressable, Box, Badge, Text } from '@gluestack-ui/themed';
import { colors, borderRadius, paddings, margins, typography } from '~/lib/theme/theme';

interface SelectableItemProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
  variant?: 'default' | 'recommended';
  toggleColor?: 'none' | 'success' | 'error';
  disabled?: boolean;
}

export const SelectableItem: React.FC<SelectableItemProps> = ({
  title,
  isSelected = false,
  onPress,
  variant = 'default',
  toggleColor = 'none',
  disabled = false,
}) => {
  const getCardStyle = () => {
    if (disabled) {
      return {
        borderColor: colors.GreyL30,
        borderWidth: 2,
        opacity: 0.7,
      };
    }
    if (toggleColor === 'success') {
      return {
        bg: colors.successBackgroundColor,
        borderColor: colors.successColor,
        borderWidth: 2,
      };
    }
    if (toggleColor === 'error') {
      return {
        bg: colors.errorBackgroundColor,
        borderColor: colors.errorColor,
        borderWidth: 2,
      };
    }
    if (isSelected) {
      return {
        bg: colors.primaryActionBackgroundColor,
        borderColor: colors.primaryActionColor,
        borderWidth: 2,
      };
    }
    return {
      bg: colors.transparent,
      borderColor: colors.GreyL30,
      borderWidth: 1,
    };
  };

  return (
    <Pressable onPress={!disabled && !isSelected ? onPress : undefined}>
      <Box
        {...getCardStyle()}
        borderRadius={borderRadius.borderRadiusSmall}
        p={paddings.paddingSmall}
        mb={margins.marginSmall}
        position="relative"
        height={60}
        justifyContent="center"
      >
        {variant === 'recommended' && (
          <Badge
            position="absolute"
            bg={colors.primaryActionColor}
            px={paddings.paddingSmall}
            py={paddings.paddingSmall}
            borderRadius={borderRadius.borderRadiusSmall}
            top={-10}
            right={-10}
          >
            <Text
              color="white"
              fontSize={typography.captionSize}
              fontWeight={typography.fontWeightMedium}
            >
              Recommandé
            </Text>
          </Badge>
        )}
        <Text fontSize={typography.bodySize}>{title}</Text>
      </Box>
    </Pressable>
  );
};
