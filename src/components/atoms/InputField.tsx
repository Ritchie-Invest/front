import React from 'react';
import { Input, InputField as GInputField } from '@gluestack-ui/themed';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password';
  accessibilityLabel?: string;
};

export const InputField = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
  accessibilityLabel,
}: Props) => {
  const isPassword = type === 'password';
  const keyboardType = type === 'email' ? 'email-address' : 'default';

  const getAutoComplete = () => {
    switch (type) {
      case 'email':
        return 'email';
      case 'password':
        return 'password';
      default:
        return undefined;
    }
  };

  const getTextContentType = () => {
    switch (type) {
      case 'email':
        return 'emailAddress';
      case 'password':
        return 'password';
      default:
        return undefined;
    }
  };

  return (
    <Input>
      <GInputField
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        autoCapitalize={type === 'email' || isPassword ? 'none' : 'sentences'}
        accessibilityLabel={accessibilityLabel || placeholder}
        textContentType={getTextContentType()}
        autoComplete={getAutoComplete()}
      />
    </Input>
  );
};
