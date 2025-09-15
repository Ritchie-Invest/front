import React from 'react';
import TextChoiceButton from '~/components/atoms/TextChoiceButton';
import IconChoiceButton from '~/components/atoms/IconChoiceButton';
import { MaterialIcons } from '@expo/vector-icons';

interface BaseChoiceButtonProps {
  borderColor: string;
  bg: string;
  onPress: () => void;
  disabled?: boolean;
}

interface IconVariantProps extends BaseChoiceButtonProps {
  variant: 'icon';
  iconName: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
}

interface TextVariantProps extends BaseChoiceButtonProps {
  variant?: 'text';
  text: string;
  color: string;
  fontWeight?: 'normal' | 'bold';
}

type ChoiceButtonProps = IconVariantProps | TextVariantProps;

const ChoiceButton: React.FC<ChoiceButtonProps> = (props) => {
  if (props.variant === 'icon') {
    return (
      <IconChoiceButton
        iconName={props.iconName}
        iconColor={props.iconColor}
        borderColor={props.borderColor}
        bg={props.bg}
        onPress={props.onPress}
        disabled={props.disabled}
      />
    );
  }

  return (
    <TextChoiceButton
      text={props.text}
      borderColor={props.borderColor}
      bg={props.bg}
      color={props.color}
      fontWeight={props.fontWeight || 'normal'}
      onPress={props.onPress}
      disabled={props.disabled}
    />
  );
};

export default ChoiceButton;
