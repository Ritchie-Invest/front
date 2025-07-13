import { useState } from 'react';
import { VStack, Text } from 'native-base';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRegister } from '../hooks/useRegister';
import { Button } from '../../../components/atoms/Button';
import { TextLink } from '../../../components/atoms/TextLink';
import { InputField } from '../../../components/atoms/InputField';
import { registerSchema } from '../validation/registerSchema';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useTranslation } from 'react-i18next';

type RegisterFormProps = {
  onBackToLogin?: () => void;
  onSuccess?: () => void;
};

export const RegisterForm = ({ onBackToLogin, onSuccess }: RegisterFormProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const register = useRegister();

  const handleSubmit = () => {
    const { isValid, errors } = useFormValidation(registerSchema, { email, password });

    if (!isValid) {
      const firstError = errors.email?.[0] || errors.password?.[0];
      setError(firstError || t('errors.validation'));
      return;
    }

    setError(null);
    setSuccessMessage(null);
    register.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          setSuccessMessage(t('register.success'));
          setTimeout(() => {
            onBackToLogin?.();
          }, 2000);
        },
        onError: (error: any) => {
          const message = error.response?.data?.message || error.message;
          setError(message || t('errors.registerFailed'));
        },
      },
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack space={4} px={4} flex={1} justifyContent="center">
          <Text fontSize="lg" textAlign="center">
            {t('register.title')}
          </Text>

          <InputField
            placeholder={t('form.email')}
            value={email}
            onChangeText={setEmail}
            type="email"
          />

          <InputField
            placeholder={t('form.password')}
            value={password}
            onChangeText={setPassword}
            type="password"
          />

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          {successMessage && (
            <Text color="green.500" fontSize="sm">
              {successMessage}
            </Text>
          )}

          <Button onPress={handleSubmit} isLoading={register.isPending} disabled={!!successMessage}>
            {t('register.button')}
          </Button>

          <TextLink onPress={() => onBackToLogin?.()}>{t('register.backToLogin')}</TextLink>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
