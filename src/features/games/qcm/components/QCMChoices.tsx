import React from 'react';
import { VStack } from '@gluestack-ui/themed';
import ChoiceButton from '../../shared/components/ChoiceButton';
import { CompleteModuleResponse } from '../../shared/models/progress';
import { colors, spacing, typography } from '~/lib/theme/theme';

interface QCMChoicesProps {
  choices: any[];
  selected: string | null;
  showFeedback: 'none' | 'success' | 'error';
  completionResult: CompleteModuleResponse | null;
  onSelect: (id: string) => void;
}

const QCMChoices: React.FC<QCMChoicesProps> = ({
  choices,
  selected,
  showFeedback,
  completionResult,
  onSelect,
}) => {
  const getButtonStyle = (isSelected: boolean, isCorrect: boolean) => {
    let borderColor = colors.GreyL30;
    let bg = colors.mainBackgroundColor;
    let color = colors.primaryTextColor;
    let fontWeight: 'normal' | 'bold' = 'normal';

    if (isSelected) {
      if (showFeedback === 'success' && isCorrect) {
        borderColor = colors.successColor;
        bg = colors.successBackgroundColor;
        color = colors.successColor;
        fontWeight = 'bold';
      } else if (showFeedback === 'error') {
        borderColor = colors.warningColor;
        bg = colors.warningBackgroundColor;
        color = colors.warningColor;
        fontWeight = 'bold';
      } else if (showFeedback === 'none') {
        borderColor = colors.primaryActionColor;
        bg = colors.primaryActionBackgroundColor;
        color = colors.primaryActionColor;
        fontWeight = 'bold';
      }
    }

    return { borderColor, bg, color, fontWeight };
  };

  return (
    <VStack space="xs" mt={spacing.spacingSmall} px={spacing.spacingVerySmall}>
      {choices.map((choice) => {
        const isSelected = selected === choice.id;
        const isCorrect = !!(completionResult?.isCorrect && isSelected);
        const style = getButtonStyle(isSelected, isCorrect);

        return (
          <ChoiceButton
            key={choice.id}
            text={choice.text}
            borderColor={style.borderColor}
            bg={style.bg}
            color={style.color}
            fontWeight={style.fontWeight}
            onPress={() => onSelect(choice.id)}
            disabled={showFeedback !== 'none'}
          />
        );
      })}
    </VStack>
  );
};

export default QCMChoices;
