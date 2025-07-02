import React from 'react';
import { VStack, Text, Spacer } from 'native-base';
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
  return (
    <OnboardingLayout progress={progress} onBackPress={onBack}>
      <VStack flex={1} space={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          Pourquoi souhaites-tu apprendre à investir ?
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
          Continuer
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
