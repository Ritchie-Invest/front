import React from 'react';
import { VStack, Text, Spacer, Box } from 'native-base';
import { useTranslation } from 'react-i18next';
import { OnboardingLayout } from '../../components/organisms/OnboardingLayout';
import { Button } from '../../../../components/atoms/Button';

interface LearningGoal {
  title: string;
  description: string;
}

interface LearningGoalsScreenProps {
  goals: LearningGoal[];
  onContinue: () => void;
  onBack: () => void;
  progress: number;
}

export const LearningGoalsScreen: React.FC<LearningGoalsScreenProps> = ({
  goals,
  onContinue,
  onBack,
  progress,
}) => {
  const { t } = useTranslation();

  return (
    <OnboardingLayout progress={progress} onBackPress={onBack}>
      <VStack flex={1} space={6}>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          {t('onboarding.learningGoals.subtitle')}
        </Text>

        <VStack space={12} flex={6} justifyContent="center" alignItems="center">
          {goals.map((goal, index) => (
            <Box key={index}>
              <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={2}>
                {goal.title}
              </Text>
              <Text fontSize="md" color="gray.600">
                {goal.description}
              </Text>
            </Box>
          ))}
        </VStack>

        <Spacer />

        <Button onPress={onContinue}>{t('onboarding.learningGoals.continueButton')}</Button>
      </VStack>
    </OnboardingLayout>
  );
};
