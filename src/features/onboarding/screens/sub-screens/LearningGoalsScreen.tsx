import React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
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
      <VStack flex={1} space="lg">
        <Text fontSize={18} color="$text600" textAlign="center">
          {t('onboarding.learningGoals.subtitle')}
        </Text>

        <VStack space="lg" flex={6} justifyContent="center" alignItems="center">
          {goals.map((goal, index) => (
            <Box key={index}>
              <Text fontSize={18} fontWeight="bold" color="$text900" mb={2}>
                {goal.title}
              </Text>
              <Text fontSize={16} color="$text600">
                {goal.description}
              </Text>
            </Box>
          ))}
        </VStack>

        <Box flex={1} />

        <Button onPress={onContinue} variant="primary">
          {t('onboarding.learningGoals.continueButton')}
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
