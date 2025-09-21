import React from 'react';
import { useLifeStore } from '../store/lifeStore';
import { LifeDisplayProps } from '../types/lifeTypes';
import { LifeCounter } from '~/components/molecules/components/LifeCounter';
import { formatTimeRemaining } from '../validation/lifeValidation';

export const LifeDisplay: React.FC<LifeDisplayProps> = ({ showTimer = false, size = 'normal' }) => {
  const { lifeStatus } = useLifeStore();

  return (
    <LifeCounter
      livesRemaining={lifeStatus.livesRemaining}
      nextLifeIn={lifeStatus.nextLifeIn}
      showTimer={showTimer}
      size={size}
      formatTime={formatTimeRemaining}
    />
  );
};
