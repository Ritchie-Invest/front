import React from 'react';
import { View } from '@gluestack-ui/themed';
import { HeartIcon } from '../../atoms/HeartIcon';
import { Timer } from '../../atoms/Timer';
import { useLifeStore } from '~/features/life/store/lifeStore';
import { formatTimeRemaining } from '~/features/life/validation/lifeValidation';

interface LifeCounterProps {
  showTimer?: boolean;
  size?: 'normal' | 'large';
}

export const LifeCounter: React.FC<LifeCounterProps> = ({ showTimer = false, size = 'normal' }) => {
  const { lifeStatus } = useLifeStore();

  return (
    <View alignItems="center" justifyContent="center">
      <HeartIcon
        count={lifeStatus.livesRemaining}
        filled={lifeStatus.livesRemaining > 0}
        size={size}
      />

      {showTimer && (
        <Timer timeInMs={lifeStatus.nextLifeIn} formatTime={formatTimeRemaining} size={size} />
      )}
    </View>
  );
};
