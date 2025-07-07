import React from 'react';
import { VStack, Text, Spacer } from 'native-base';
import { useTranslation } from 'react-i18next';
import { OnboardingLayout } from '../../components/organisms/OnboardingLayout';
import { AnswerButton } from '~/components/molecules/AnswerButton';
import { Button } from '../../../../components/atoms/Button';
import { OnboardingGoal } from '../../models/onboarding.types';

interface GoalSelectionScreenProps {
  goals: OnboardingGoal[];
  selectedGoal?: string;
  onSelectGoal: (goalId: string) => void;
  onContinue: () => void;
  onBack: () => void;
  progress: number;
}

export const GoalSelectionScreen: React.FC<GoalSelectionScreenProps> = ({
  goals,
  selectedGoal,
  onSelectGoal,
  onContinue,
  onBack,
  progress,
}) => {
  const { t } = useTranslation();

  return (
    <OnboardingLayout progress={progress} onBackPress={onBack}>
      <VStack flex={1} space={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {t('onboarding.goalSelection.title')}
        </Text>

        <VStack space={3}>
          {goals.map((goal) => (
            <AnswerButton
              key={goal.id}
              title={goal.title}
              isSelected={selectedGoal === goal.id}
              onPress={() => onSelectGoal(goal.id)}
            />
          ))}
        </VStack>

        <Spacer />

        <Button
          onPress={onContinue}
          variant={selectedGoal ? 'primary' : 'disabled'}
          isDisabled={!selectedGoal}
        >
          {t('onboarding.goalSelection.continueButton')}
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
