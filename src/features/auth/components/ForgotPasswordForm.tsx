import { useState } from 'react';
import { VStack, Text } from '@gluestack-ui/themed';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForgotPassword } from '../hooks/useForgotPassword';
import { Button } from '../../../components/atoms/Button';
import { TextLink } from '../../../components/atoms/TextLink';
import { InputField } from '../../../components/atoms/InputField';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { forgotPasswordSchema } from '../validation/forgotPasswordSchema';
import { useTranslation } from 'react-i18next';
import { colors, spacing, paddings } from '~/lib/theme/theme';

type ForgotPasswordFormProps = {
  onBackToLogin?: () => void;
};

export const ForgotPasswordForm = ({ onBackToLogin }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const forgotPassword = useForgotPassword();

  const handleSubmit = () => {
    const { isValid, errors } = useFormValidation(forgotPasswordSchema, { email });

    if (!isValid) {
      setError(errors.email?.[0] ?? t('forgot.error.invalidEmail'));
      return;
    }

    setError(null);
    forgotPassword.mutate(
      { email },
      {
        onError: (error: any) => {
          const message = error.response?.data?.message || error.message;
          setError(message || t('forgot.error.generic'));
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
        <VStack space="lg" px={paddings.paddingVerySmall} flex={1} justifyContent="center">
          <Text fontSize={18} textAlign="center">
            {t('forgot.title')}
          </Text>

          <InputField
            placeholder={t('form.email')}
            value={email}
            onChange={setEmail}
            type="email"
          />

          {error && <Text color={colors.errorColor}>{error}</Text>}

          <Button onPress={handleSubmit} isLoading={forgotPassword.isPending}>
            {t('forgot.button')}
          </Button>

          {forgotPassword.isSuccess && (
            <Text color={colors.successColor}>{t('forgot.success')}</Text>
          )}
          {forgotPassword.isError && (
            <Text color={colors.errorColor}>{t('forgot.error.generic')}</Text>
          )}

          <TextLink onPress={() => onBackToLogin?.()}>{t('forgot.backToLogin')}</TextLink>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
