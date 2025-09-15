import React from 'react';
import { HStack } from 'native-base';
import ProgressBar from './ProgressBar';

interface QuizHeaderProps {
  progress: number;
  onClose: () => void;
}

const GamesHeader: React.FC<QuizHeaderProps> = ({ progress, onClose }) => (
  <HStack alignItems="center" px={4} pt={6} pb={2}>
    <ProgressBar progress={progress} />
  </HStack>
);

export default GamesHeader;
