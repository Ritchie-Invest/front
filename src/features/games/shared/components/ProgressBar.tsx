import React from 'react';
import { Box, Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import { colors, spacing, borderRadius } from '~/lib/theme/theme';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <Box
    bg={colors.GreyL30}
    borderRadius={borderRadius.borderRadius2xl}
    overflow="hidden"
    h={spacing.spacingMedium2}
    w="100%"
  >
    <Progress
      value={progress * 100}
      h={spacing.spacingMedium2}
      borderRadius={borderRadius.borderRadius2xl}
    >
      <ProgressFilledTrack bg={colors.accentTextColor} />
    </Progress>
  </Box>
);

export default ProgressBar;
