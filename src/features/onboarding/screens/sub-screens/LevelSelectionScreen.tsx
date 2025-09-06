import React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { OnboardingLayout } from '../../components/organisms/OnboardingLayout';
import { SelectableItem } from '~/components/molecules/components/selectableItem';
import { Button } from '../../../../components/atoms/Button';
import { OnboardingLevel } from '../../models/onboarding.types';

interface LevelSelectionScreenProps {
  levels: OnboardingLevel[];
  selectedLevel?: string;
  onSelectLevel: (levelId: string) => void;
  onContinue: () => void;
  onBack: () => void;
  progress: number;
}

export const LevelSelectionScreen: React.FC<LevelSelectionScreenProps> = ({
  levels,
  selectedLevel,
  onSelectLevel,
  onContinue,
  onBack,
  progress,
}) => {
  const { t } = useTranslation();

  return (
    <OnboardingLayout progress={progress} onBackPress={onBack}>
      <VStack flex={1} space="lg">
        <Text fontSize={24} fontWeight="bold" color="$text900">
          {t('onboarding.levelSelection.title')}
        </Text>

        <VStack space="md">
          {levels.map((level) => (
            <SelectableItem
              key={level.id}
              title={level.title}
              isSelected={selectedLevel === level.id}
              onPress={() => onSelectLevel(level.id)}
              variant={level.recommended ? 'recommended' : 'default'}
            />
          ))}
        </VStack>

        <Box flex={1} />

        <Button onPress={onContinue} variant={selectedLevel ? 'primary' : 'disabled'}>
          {t('onboarding.levelSelection.continueButton')}
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
