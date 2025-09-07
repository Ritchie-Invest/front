import React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { OnboardingLayout } from '../../components/organisms/OnboardingLayout';
import { AnswerButton } from '~/components/molecules/components/AnswerButton';
import { Button } from '../../../../components/atoms/Button';
import { OnboardingGoal } from '../../models/onboarding.types';
import { colors, spacing, typography } from '~/lib/theme/theme';

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
      <VStack flex={1} space={spacing.spacingLargeFallback}>
        <Text
          fontSize={24}
          fontWeight={typography.fontWeightBoldFallback}
          color={colors.primaryTextColor}
        >
          {t('onboarding.goalSelection.title')}
        </Text>

        <VStack space={spacing.spacingMediumFallback}>
          {goals.map((goal) => (
            <AnswerButton
              key={goal.id}
              title={goal.title}
              isSelected={selectedGoal === goal.id}
              onPress={() => onSelectGoal(goal.id)}
            />
          ))}
        </VStack>

        <Box flex={1} />

        <Button onPress={onContinue} variant={selectedGoal ? 'primary' : 'disabled'}>
          {t('onboarding.goalSelection.continueButton')}
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
