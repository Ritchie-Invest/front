import { useState } from 'react';
import { VStack, Text } from '@gluestack-ui/themed';
import { typography, paddings } from '~/lib/theme/theme';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRegister } from '../hooks/useRegister';
import { Button } from '../../../components/atoms/Button';
import { TextLink } from '../../../components/atoms/TextLink';
import { InputField } from '../../../components/atoms/InputField';
import { registerSchema } from '../validation/registerSchema';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useTranslation } from 'react-i18next';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';

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
        <VStack space="lg" px={paddings.paddingVerySmall} flex={1} justifyContent="center">
          <PageCover title={t('register.title')} Screen={Screens.AUTH_REGISTER} size={250} />

          <InputField
            placeholder={t('form.email')}
            value={email}
            onChange={setEmail}
            type="email"
          />

          <InputField
            placeholder={t('form.password')}
            value={password}
            onChange={setPassword}
            type="password"
          />

          {error && (
            <Text color="$red500" fontSize={typography.bodySmallSize}>
              {error}
            </Text>
          )}

          {successMessage && (
            <Text color="$green500" fontSize={typography.bodySmallSize}>
              {successMessage}
            </Text>
          )}

          <Button onPress={handleSubmit} isLoading={register.isPending}>
            {t('register.button')}
          </Button>

          <TextLink onPress={() => onBackToLogin?.()}>{t('register.backToLogin')}</TextLink>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
