import React from 'react';
import { Box } from '@gluestack-ui/themed';
import { ViewProps } from 'react-native';
import { borderRadius, colors, paddings } from '~/lib/theme/theme';

interface CardProps extends React.ComponentProps<typeof Box> {
  variant?: 'default' | 'chapter' | 'lesson';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ variant = 'default', children, style, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'chapter':
        return {
          backgroundColor: colors.successBackgroundColor,
          padding: paddings.paddingMedium,
          borderRadius: borderRadius.borderRadiusMedium,
          shadowColor: colors.primaryTextColor,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 2,
        };
      case 'lesson':
        return {
          backgroundColor: colors.primaryActionColor,
          padding: paddings.paddingMedium,
          borderRadius: borderRadius.borderRadiusMedium,
          borderWidth: 1,
          borderColor: colors.primaryActionColor,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.componentBackgroundColor,
          padding: paddings.paddingMedium,
          borderRadius: borderRadius.borderRadiusSmall,
        };
    }
  };

  return (
    <Box style={[getVariantStyles(), style]} {...props}>
      {children}
    </Box>
  );
};
