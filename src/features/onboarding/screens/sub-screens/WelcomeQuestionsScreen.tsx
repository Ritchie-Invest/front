import React from 'react';
import { VStack, Text, Spacer } from 'native-base';
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
      <VStack flex={1} justifyContent="center" alignItems="center" space={6}>
        <VStack space={4} alignItems="center" justifyContent="center" flex={6}>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="gray.800">
            {t('onboarding.questions.title')}
          </Text>

          <Text fontSize="md" textAlign="center" color="gray.600">
            {t('onboarding.questions.description')}
          </Text>
        </VStack>

        <Spacer />

        <Button onPress={onContinue} width="100%">
          {t('onboarding.questions.continueButton')}
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
