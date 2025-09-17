import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { VStack, Text, HStack } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { config } from '../../../lib/config';
import { Button } from '../../../components/atoms/Button';
import { InputField } from '../../../components/atoms/InputField';
import { TextLink } from '../../../components/atoms/TextLink';
import { useLogin } from '../hooks/useLogin';
import { useRegister } from '../hooks/useRegister';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { loginSchema } from '../validation/loginSchema';
import { registerSchema } from '../validation/registerSchema';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { AuthScreen } from '../types/AuthScreen';
import PageCover from '~/components/organisms/components/PageCover';
import { Screen } from '~/features/navigation/Type/Screen';
import { paddings, spacing, typography, colors, margins } from '~/lib/theme/theme';

interface AuthFormProps {
  auth: AuthScreen;
  onSuccess: () => void;
  signupEnabled?: boolean;
  onSwitchToRegister?: () => void;
  onSwitchToLogin?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  auth,
  onSuccess,
  signupEnabled,
  onSwitchToRegister,
  onSwitchToLogin,
  onSwitchToForgotPassword,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const login = useLogin();
  const register = useRegister();
  const showForgotPassword = config.FORGOT_PASSWORD_ENABLED;
  const showSignUp = typeof signupEnabled === 'boolean' ? signupEnabled : config.SIGNUP_ENABLED;

  const isLogin = auth === AuthScreen.LOGIN;
  const isForgotPassword = auth === AuthScreen.FORGOT_PASSWORD;
  const schema = isLogin ? loginSchema : registerSchema;
  const mutation = isLogin ? login : register;

  const handleSubmit = () => {
    const { isValid, errors } = useFormValidation(schema, { email, password });

    if (!isValid) {
      const firstError = errors.email?.[0] || errors.password?.[0];
      setError(firstError || t('errors.validation'));
      return;
    }

    setError(null);
    setSuccessMessage(null);
    mutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (!isLogin) {
            setSuccessMessage(t('register.success'));
            setTimeout(() => {
              onSwitchToLogin?.();
            }, 2000);
          } else {
            onSuccess();
          }
        },
        onError: (error: any) => {
          const message = error.response?.data?.message || error.message;
          setError(message || t(isLogin ? 'errors.loginFailed' : 'errors.registerFailed'));
        },
      },
    );
  };

  if (isForgotPassword) {
    return <ForgotPasswordForm onBackToLogin={onSwitchToLogin} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <VStack
          space={spacing.spacingMediumFallback}
          px={paddings.paddingSmall}
          flex={1}
          justifyContent="center"
          bg="$white"
        >
          <PageCover
            title={isLogin ? 'Contents de vous revoir !' : 'Bienvenue'}
            Screen={isLogin ? Screen.AUTH_LOGIN : Screen.AUTH_REGISTER}
            size={150}
          />
          <Text fontSize={typography.heading1Size} textAlign="center" my={margins.marginMedium}>
            {t(isLogin ? 'login.title' : 'register.title')}
          </Text>

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
            <Text color={colors.errorColor} fontSize={14}>
              {error}
            </Text>
          )}

          {successMessage && (
            <Text color={colors.successColor} fontSize={14}>
              {successMessage}
            </Text>
          )}

          <Button onPress={handleSubmit} isLoading={mutation.isPending}>
            {t(isLogin ? 'login.button' : 'register.button')}
          </Button>

          <HStack justifyContent="space-between">
            {isLogin && showSignUp && (
              <TextLink onPress={onSwitchToRegister ?? (() => {})}>
                Vous n'avez pas de compte ? S'inscrire
              </TextLink>
            )}
            {!isLogin && (
              <TextLink onPress={onSwitchToLogin ?? (() => {})}>
                Vous avez déjà un compte ? Se connecter
              </TextLink>
            )}
            {isLogin && showForgotPassword && (
              <TextLink onPress={onSwitchToForgotPassword ?? (() => {})}>
                {t('login.forgotPassword')}
              </TextLink>
            )}
          </HStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
