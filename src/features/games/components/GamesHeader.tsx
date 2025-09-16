import React from 'react';
import { HStack } from '@gluestack-ui/themed';
import ProgressBar from './ProgressBar';
import { spacing, paddings } from '~/lib/theme/theme';

interface QuizHeaderProps {
  progress: number;
  onClose: () => void;
}

const GamesHeader: React.FC<QuizHeaderProps> = ({ progress, onClose }) => (
  <HStack
    alignItems="center"
    px={paddings.paddingVerySmall}
    pt={paddings.paddingSmall}
    pb={paddings.paddingMinimum}
  >
    <ProgressBar progress={progress} />
  </HStack>
);

export default GamesHeader;
