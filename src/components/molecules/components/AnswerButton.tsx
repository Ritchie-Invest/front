import React from 'react';
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
