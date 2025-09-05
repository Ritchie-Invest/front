import React from 'react';
import { HStack, Pressable } from 'native-base';
import ProgressBar from './ProgressBar';
import { Icon } from '~/components/atoms/Icon';

interface QuizHeaderProps {
  progress: number;
  onClose: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ progress, onClose }) => (
  <HStack alignItems="center" px={4} pt={6} pb={2}>
    <Pressable onPress={onClose}>
      <Icon name="close" size="2xl" color="black" />
    </Pressable>
    <ProgressBar progress={progress} />
  </HStack>
);

export default QuizHeader;
