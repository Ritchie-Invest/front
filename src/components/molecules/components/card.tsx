import React from 'react';
import { Box } from '@gluestack-ui/themed';
import { borderRadius, colors, paddings } from '~/lib/theme/theme';
import { ViewProps } from 'react-native';

interface CardProps extends React.ComponentProps<typeof Box> {
  variant?: 'default' | 'chapter' | 'lesson';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ variant = 'default', children, style, ...props }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
      default:
        return {
          backgroundColor: colors.GreyL15,
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
