import React from 'react';
import { View } from 'react-native';
import { VStack, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/atoms/Button';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  const { t } = useTranslation();

  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 16, justifyContent: 'center' }}
    >
      <VStack space="lg" alignItems="center">
        <Text fontSize={24} fontWeight="bold" textAlign="center" color="$text900">
          {t('onboarding.welcome.title')}
        </Text>

        <View style={{ flex: 1 }} />

        <VStack space="md" style={{ width: '100%' }}>
          <Button onPress={onStart}>{t('onboarding.welcome.startButton')}</Button>

          <Button variant="secondary" onPress={onLogin}>
            {t('onboarding.welcome.loginButton')}
          </Button>
        </VStack>
      </VStack>
    </View>
  );
};
