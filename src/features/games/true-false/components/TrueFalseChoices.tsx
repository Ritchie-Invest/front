import React from 'react';
import { HStack } from 'native-base';
import ChoiceButton from '../../shared/components/ChoiceButton';
import { CompleteModuleResponse } from '../../shared/models/progress';

interface TrueFalseChoicesProps {
  selected: boolean | null;
  showFeedback: 'none' | 'success' | 'error';
  completionResult: CompleteModuleResponse | null;
  onSelect: (isTrue: boolean) => void;
}

const TrueFalseChoices: React.FC<TrueFalseChoicesProps> = ({
  selected,
  showFeedback,
  completionResult,
  onSelect,
}) => {
  const getButtonProps = (value: boolean) => {
    const isSelected = selected === value;
    const isCorrect = !!(completionResult?.isCorrect && isSelected);

    const iconName = value ? ('check' as const) : ('close' as const);
    const baseColor = value ? 'green.500' : 'red.500';

    let borderColor = 'coolGray.200';
    let bg = '#fff';
    let iconColor = 'coolGray.400';

    if (isSelected) {
      if (showFeedback === 'success' && isCorrect) {
        borderColor = 'green.500';
        bg = 'green.50';
        iconColor = 'green.600';
      } else if (showFeedback === 'error') {
        borderColor = 'orange.500';
        bg = 'orange.50';
        iconColor = 'orange.700';
      } else if (showFeedback === 'none') {
        borderColor = 'blue.400';
        bg = 'blue.50';
        iconColor = baseColor;
      }
    } else {
      iconColor = baseColor;
    }

    return {
      variant: 'icon' as const,
      iconName,
      iconColor,
      borderColor,
      bg,
    };
  };

  const choices = [true, false];

  return (
    <HStack space={4} mt={8} px={4} justifyContent="center">
      {choices.map((value) => (
        <ChoiceButton
          key={value.toString()}
          {...getButtonProps(value)}
          onPress={() => onSelect(value)}
          disabled={showFeedback !== 'none'}
        />
      ))}
    </HStack>
  );
};

export default TrueFalseChoices;
