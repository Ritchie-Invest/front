import React from 'react';
import { VStack } from 'native-base';
import ChoiceButton from '../../shared/components/ChoiceButton';
import { CompleteModuleResponse } from '../../shared/models/progress';

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
    let borderColor = 'coolGray.200';
    let bg = '#fff';
    let color = 'coolGray.700';
    let fontWeight: 'normal' | 'bold' = 'normal';

    if (isSelected) {
      if (showFeedback === 'success' && isCorrect) {
        borderColor = 'green.500';
        bg = 'green.50';
        color = 'green.600';
        fontWeight = 'bold';
      } else if (showFeedback === 'error') {
        borderColor = 'orange.500';
        bg = 'orange.50';
        color = 'orange.700';
        fontWeight = 'bold';
      } else if (showFeedback === 'none') {
        borderColor = 'blue.400';
        bg = 'blue.50';
        color = 'blue.700';
        fontWeight = 'bold';
      }
    }

    return { borderColor, bg, color, fontWeight };
  };

  return (
    <VStack space={3} mt={8} px={4}>
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
