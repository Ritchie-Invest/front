import React from 'react';
import { View } from '@gluestack-ui/themed';
import { HeartIcon } from '../../atoms/HeartIcon';
import { Timer } from '../../atoms/Timer';

interface LifeCounterProps {
  livesRemaining: number;
  nextLifeIn: number;
  showTimer?: boolean;
  size?: 'normal' | 'large';
  formatTime: (timeInMs: number) => string;
}

export const LifeCounter: React.FC<LifeCounterProps> = ({
  livesRemaining,
  nextLifeIn,
  showTimer = false,
  size = 'normal',
  formatTime,
}) => {
  return (
    <View alignItems="center" justifyContent="center">
      <HeartIcon count={livesRemaining} filled={livesRemaining > 0} size={size} />

      {showTimer && <Timer timeInMs={nextLifeIn} formatTime={formatTime} size={size} />}
    </View>
  );
};
