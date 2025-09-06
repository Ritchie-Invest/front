import React from 'react';
import { View } from 'react-native';
import { VStack, Text } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { OnboardingLayout } from '../../components/organisms/OnboardingLayout';
import { Button } from '../../../../components/atoms/Button';

interface WelcomeQuestionsScreenProps {
  onContinue: () => void;
  onBack: () => void;
  progress: number;
}

export const WelcomeQuestionsScreen: React.FC<WelcomeQuestionsScreenProps> = ({
  onContinue,
  onBack,
  progress,
}) => {
  const { t } = useTranslation();

  return (
    <OnboardingLayout progress={progress} onBackPress={onBack}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <VStack space="md" alignItems="center" style={{ flex: 6, justifyContent: 'center' }}>
          <Text fontSize={24} fontWeight="bold" textAlign="center" color="$text900">
            {t('onboarding.questions.title')}
          </Text>

          <Text fontSize={16} textAlign="center" color="$text600">
            {t('onboarding.questions.description')}
          </Text>
        </VStack>

        <View style={{ flex: 1 }} />

        <View style={{ width: '100%' }}>
          <Button onPress={onContinue}>{t('onboarding.questions.continueButton')}</Button>
        </View>
      </View>
    </OnboardingLayout>
  );
};
