import React from 'react';
import { Box, Text } from 'native-base';
import { SelectableItem } from './selectableItem';

interface AnswerButtonProps {
  title: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  title,
  isSelected = false,
  onPress,
}) => {
  return <SelectableItem title={title} isSelected={isSelected} onPress={onPress} />;
};
