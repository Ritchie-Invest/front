import React from 'react';
import ChoiceButtonAtom from '~/components/atoms/ChoiceButton';
import { colors } from '~/lib/theme/theme';

interface ChoiceButtonProps {
  text: string;
  selected: boolean;
  correct: boolean;
  showFeedback: 'none' | 'success' | 'error';
  onPress: () => void;
  disabled?: boolean;
  isCorrectAnswer?: boolean;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = (props) => {
  let borderColor = colors.GreyL30;
  let bg = colors.mainBackgroundColor;
  let color = colors.primaryTextColor;
  let fontWeight: 'normal' | 'bold' = 'normal';

  if (props.selected) {
    if (props.showFeedback === 'success' && props.correct) {
      borderColor = colors.successColor;
      bg = colors.successBackgroundColor;
      color = colors.successColor;
      fontWeight = 'bold';
    } else if (props.showFeedback === 'error') {
      borderColor = colors.warningColor;
      bg = colors.warningBackgroundColor;
      color = colors.warningColor;
      fontWeight = 'bold';
    } else if (props.showFeedback === 'none') {
      borderColor = colors.primaryActionColor;
      bg = colors.primaryActionBackgroundColor;
      color = colors.primaryActionColor;
      fontWeight = 'bold';
    }
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
