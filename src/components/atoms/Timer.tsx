import React from 'react';
import { Text } from '@gluestack-ui/themed';
import { colors, typography, margins } from '~/lib/theme/theme';

interface TimerProps {
  timeInMs: number;
  formatTime: (timeInMs: number) => string;
  size?: 'normal' | 'large';
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | string;
  color?: string;
}

export const Timer: React.FC<TimerProps> = ({
  timeInMs,
  formatTime,
  size = 'normal',
  fontWeight = 'normal',
  color = colors.primaryTextColor,
}) => {
  const fontSize = size === 'large' ? typography.timerLargeSize : typography.timerSmallSize;

  if (timeInMs <= 0) return null;

  return (
    <Text
      marginTop={margins.marginMinimum}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {formatTime(timeInMs)}
    </Text>
  );
};
