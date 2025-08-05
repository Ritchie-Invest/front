import { TextInput, StyleSheet, Keyboard, Platform } from 'react-native';
import { Box, useTheme } from 'native-base';
import { baseFontSize } from 'native-base/lib/typescript/theme/tools';

type Props = {
  placeholder: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'numeric';
  accessibilityLabel?: string;
  borderWidth?: number;
  bg?: string;
  fontSize?: number;
  textAlign?: 'left' | 'right' | 'center';
  returnKeyType?: 'done' | 'next' | 'send' | 'go' | 'search';
  onSubmitEditing?: () => void;
  blurOnSubmit?: boolean;
};

export const InputField = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  accessibilityLabel,
  borderWidth = 1,
  bg = 'white',
  fontSize = 12,
  textAlign = 'left',
  returnKeyType = 'done',
  onSubmitEditing,
  blurOnSubmit = true,
}: Props) => {
  const isPassword = type === 'password';
  const keyboardType =
    type === 'email'
      ? 'email-address'
      : type === 'numeric'
        ? Platform.OS === 'android'
          ? 'number-pad'
          : 'numeric'
        : 'default';

  const handleSubmitEditing = () => {
    if (onSubmitEditing) {
      onSubmitEditing();
    } else {
      if (type === 'numeric') {
        Keyboard.dismiss();
      }
    }
  };

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
    <Box
      borderWidth={borderWidth}
      borderColor="coolGray.300"
      borderRadius="md"
      bg={bg}
      p={2}
      width="100%"
    >
      <TextInput
        style={{
          fontSize: fontSize,
          color: 'black',
          width: '100%',
          textAlign: textAlign,
          backgroundColor: bg,
        }}
        placeholder={placeholder}
        value={value !== undefined && value !== null ? String(value) : ''}
        onChangeText={onChange}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        autoCapitalize={type === 'email' || isPassword ? 'none' : 'sentences'}
        accessibilityLabel={accessibilityLabel || placeholder}
        textContentType={getTextContentType()}
        autoComplete={getAutoComplete()}
        returnKeyType={returnKeyType}
        onSubmitEditing={handleSubmitEditing}
        blurOnSubmit={blurOnSubmit}
        enablesReturnKeyAutomatically={true}
      />
    </Box>
  );
};
