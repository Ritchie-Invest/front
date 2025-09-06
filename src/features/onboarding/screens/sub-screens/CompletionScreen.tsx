import React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { OnboardingLayout } from '../../components/organisms/OnboardingLayout';
import { Button } from '../../../../components/atoms/Button';

interface CompletionScreenProps {
  title: string;
  description: string;
  onContinue: () => void;
  onBack: () => void;
  progress: number;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  title,
  description,
  onContinue,
  onBack,
  progress,
}) => {
  const { t } = useTranslation();

  return (
    <OnboardingLayout progress={progress} onBackPress={onBack}>
      <VStack flex={1} justifyContent="center" alignItems="center" space="lg">
        <VStack space="lg" alignItems="center" justifyContent="center" flex={6}>
          <Text fontSize={24} fontWeight="bold" textAlign="center" color="$text900">
            {title}
          </Text>

          <Text fontSize={16} textAlign="center" color="$text600">
            {description}
          </Text>
        </VStack>

        <Box flex={1} />

        <Button onPress={onContinue}>{t('onboarding.completion.startButton')}</Button>
      </VStack>
    </OnboardingLayout>
  );
};
