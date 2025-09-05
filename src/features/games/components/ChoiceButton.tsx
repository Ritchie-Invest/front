import React from 'react';
import ChoiceButtonAtom from '~/components/atoms/ChoiceButton';

interface ChoiceButtonProps {
  text: string;
  selected: boolean;
  correct: boolean;
  showFeedback: 'none' | 'success' | 'error';
  onPress: () => void;
  disabled?: boolean;
  isCorrectAnswer?: boolean;
  isReviewMode?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = (props) => {
  let borderColor = 'coolGray.200';
  let bg = '#fff';
  let color = 'coolGray.700';
  let fontWeight: 'normal' | 'bold' = 'normal';

  if (props.isReviewMode && props.isCorrectAnswer) {
    borderColor = 'green.500';
    bg = 'green.100';
    color = 'green.700';
    fontWeight = 'bold';
  } else if (props.selected) {
    if (props.showFeedback === 'success' && props.correct) {
      borderColor = 'green.500';
      bg = 'green.50';
      color = 'green.600';
      fontWeight = 'bold';
    } else if (props.showFeedback === 'error') {
      borderColor = 'orange.500';
      bg = 'orange.50';
      color = 'orange.700';
      fontWeight = 'bold';
    } else if (props.showFeedback === 'none') {
      borderColor = 'blue.400';
      bg = 'blue.50';
      color = 'blue.700';
      fontWeight = 'bold';
    }
  }
  if (props.showFeedback === 'success' && props.correct) {
    borderColor = 'green.500';
    bg = 'green.50';
    color = 'green.600';
    fontWeight = 'bold';
  }

  return (
    <ChoiceButtonAtom
      text={props.text}
      borderColor={borderColor}
      bg={bg}
      color={color}
      fontWeight={fontWeight}
      onPress={props.onPress}
      disabled={props.disabled}
    />
  );
};

export default ChoiceButton;
