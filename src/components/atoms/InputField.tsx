import { TextInput, StyleSheet } from 'react-native';
import { Box, useTheme } from 'native-base';
import { baseFontSize } from 'native-base/lib/typescript/theme/tools';

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  type?: 'text' | 'email' | 'password' | 'numeric';
  accessibilityLabel?: string;
  borderWidth?: number;
  bg?: string;
};

export const InputField = ({
  placeholder,
  value,
  onChangeText,
  type = 'text',
  accessibilityLabel,
  borderWidth = 1,
  bg = 'white',
}: Props) => {
  const isPassword = type === 'password';
  const keyboardType =
    type === 'email' ? 'email-address' : type === 'numeric' ? 'numeric' : 'default';

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
        style={{ fontSize: 50, color: 'black', width: '100%' }}
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
    </Box>
  );
};
