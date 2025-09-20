import React from 'react';
import { spacing, borderRadius, colors, typography } from '~/lib/theme/theme';
import { Box, Text } from '@gluestack-ui/themed';

interface ChartLabelProps {
  color: string;
  label: string;
  idx?: number;
}

export default function ChartLabel({ color, label }: ChartLabelProps) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      style={{
        marginHorizontal: spacing.spacingSmall,
        marginVertical: spacing.spacingVerySmall,
      }}
    >
      <Box
        width={12}
        height={12}
        bg={color}
        style={{ marginRight: spacing.spacingSmall }}
        rounded={borderRadius.borderRadiusVerySmall}
      />
      <Text fontSize={typography.bodySmallSize} color={colors.primaryTextColor}>
        {label}
      </Text>
    </Box>
  );
}
