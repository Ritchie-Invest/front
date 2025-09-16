import React from 'react';
import { HStack } from '@gluestack-ui/themed';
import ProgressBar from './ProgressBar';
import { spacing } from '~/lib/theme/theme';

interface QuizHeaderProps {
  progress: number;
  onClose: () => void;
}

const GamesHeader: React.FC<QuizHeaderProps> = ({ progress, onClose }) => (
  <HStack
    alignItems="center"
    px={spacing.spacingVerySmall}
    pt={spacing.spacingSmall}
    pb={spacing.spacingMinimum}
  >
    <ProgressBar progress={progress} />
  </HStack>
);

export default GamesHeader;
