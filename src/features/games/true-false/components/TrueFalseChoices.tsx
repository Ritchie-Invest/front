import React from 'react';
import { HStack } from '@gluestack-ui/themed';
import ChoiceButton from '../../shared/components/ChoiceButton';
import { CompleteModuleResponse } from '../../shared/models/progress';
import { colors, spacing } from '~/lib/theme/theme';

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
    const baseColor = value ? colors.successColor : colors.errorColor;

    let borderColor = colors.GreyL30;
    let bg = colors.mainBackgroundColor;
    let iconColor = colors.Grey;

    if (isSelected) {
      if (showFeedback === 'success' && isCorrect) {
        borderColor = colors.successColor;
        bg = colors.successBackgroundColor;
        iconColor = colors.successColor;
      } else if (showFeedback === 'error') {
        borderColor = colors.warningColor;
        bg = colors.warningBackgroundColor;
        iconColor = colors.warningColor;
      } else if (showFeedback === 'none') {
        borderColor = colors.primaryActionColor;
        bg = colors.primaryActionBackgroundColor;
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
    <HStack
      space="xs"
      mt={spacing.spacingSmall}
      px={spacing.spacingVerySmall}
      justifyContent="center"
    >
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
