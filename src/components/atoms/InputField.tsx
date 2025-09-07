import React from 'react';
import { Input, InputField as GInputField } from '@gluestack-ui/themed';
import { colors, paddings } from '../../lib/theme/theme';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password';
  accessibilityLabel?: string;
  variant?: 'outline' | 'rounded' | 'underlined';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export const InputField = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
  accessibilityLabel,
  variant = 'rounded',
  size = 'md',
  isDisabled = false,
  isInvalid = false,
  isReadOnly = false,
}: Props) => {
  const isPassword = type === 'password';

  return (
    <Input
      variant={variant}
      size={size}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
      height={48}
    >
      <GInputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        accessibilityLabel={accessibilityLabel || placeholder}
      />
    </Input>
  );
};
