import React from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, typography, iconSizes } from '~/lib/theme/theme';

interface HeartIconProps {
  count?: number;
  filled?: boolean;
  size?: 'normal' | 'large';
}

export const HeartIcon: React.FC<HeartIconProps> = ({ count, filled = true, size = 'normal' }) => {
  const iconSize = size === 'large' ? iconSizes.iconXXLarge : iconSizes.iconMedium;
  const textSize = size === 'large' ? typography.bodySize : typography.bodySmallSize;

  return (
    <View flexDirection="row" alignItems="center" gap={4}>
      <MaterialIcons
        name={filled ? 'favorite' : 'favorite-border'}
        size={iconSize}
        color={colors.lifeColor}
      />
      {count !== undefined && (
        <Text
          fontSize={textSize}
          fontWeight={typography.fontWeightBold}
          color={colors.primaryTextColor}
        >
          {count}
        </Text>
      )}
    </View>
  );
};
