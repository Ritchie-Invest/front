import React from 'react';
import { VStack, Text, Spacer } from 'native-base';
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
      <VStack flex={1} space={6}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {t('onboarding.levelSelection.title')}
        </Text>

        <VStack space={3}>
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

        <Spacer />

        <Button
          onPress={onContinue}
          variant={selectedLevel ? 'primary' : 'disabled'}
          isDisabled={!selectedLevel}
        >
          {t('onboarding.levelSelection.continueButton')}
        </Button>
      </VStack>
    </OnboardingLayout>
  );
};
