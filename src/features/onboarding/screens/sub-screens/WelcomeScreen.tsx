import React from 'react';
import { VStack, Text, Spacer } from 'native-base';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/atoms/Button';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  const { t } = useTranslation();

  return (
    <VStack flex={1} bg="white" px="4" justifyContent="center">
      <VStack space={6} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.800">
          {t('onboarding.welcome.title')}
        </Text>

        <Spacer />

        <VStack space={4} width="100%">
          <Button onPress={onStart}>{t('onboarding.welcome.startButton')}</Button>

          <Button variant="secondary" onPress={onLogin}>
            {t('onboarding.welcome.loginButton')}
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};
