import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { VStack, Text, HStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { config } from '../../../lib/config';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { TextLink } from '../../../components/atoms/TextLink';
import { useLogin } from '../hooks/useLogin';
import { RegisterForm } from './RegisterForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { loginSchema } from '../validation/loginSchema';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { AuthScreen } from '../models/authScreen';

interface LoginFormProps {
  onSuccess: () => void;
  signupEnabled?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, signupEnabled }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [screen, setScreen] = useState<AuthScreen>('login');

  const login = useLogin();
  const showForgotPassword = config.FORGOT_PASSWORD_ENABLED;
  const showSignUp = typeof signupEnabled === 'boolean' ? signupEnabled : config.SIGNUP_ENABLED;

  const handleSubmit = () => {
    const { isValid, errors } = useFormValidation(loginSchema, { email, password });

    if (!isValid) {
      const firstError = errors.email?.[0] || errors.password?.[0];
      setError(firstError || t('errors.validation'));
      return;
    }

    setError(null);
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          onSuccess();
        },
        onError: (error: any) => {
          const message = error.response?.data?.message || error.message;
          setError(message || t('errors.loginFailed'));
        },
      },
    );
  };

  if (screen === 'register')
    return <RegisterForm onBackToLogin={() => setScreen('login')} onSuccess={onSuccess} />;
  if (screen === 'forgotPassword')
    return <ForgotPasswordForm onBackToLogin={() => setScreen('login')} />;

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
            {t('login.title')}
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

          <Button onPress={handleSubmit} isLoading={login.isPending}>
            {t('login.button')}
          </Button>

          <HStack justifyContent="space-between">
            {showSignUp && (
              <TextLink onPress={() => setScreen('register')}>{t('login.signUp')}</TextLink>
            )}
            {showForgotPassword && (
              <TextLink onPress={() => setScreen('forgotPassword')}>
                {t('login.forgotPassword')}
              </TextLink>
            )}
          </HStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
