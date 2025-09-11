import React from 'react';
import { Input, InputField as GInputField } from '@gluestack-ui/themed';
import { colors, paddings, typography } from '../../lib/theme/theme';

type Props = {
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'numeric';
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
  onChange,
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
      width="100%"
    >
      <GInputField
        placeholder={placeholder}
        fontSize={variant === 'underlined' ? typography.transactionInputSize : typography.bodySize}
        value={value !== undefined && value !== null ? String(value) : ''}
        onChangeText={onChange}
        secureTextEntry={isPassword}
        accessibilityLabel={accessibilityLabel || placeholder}
      />
    </Input>
  );
};
