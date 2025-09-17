import React from 'react';
import { VStack } from '@gluestack-ui/themed';
import { CompleteModuleResponse } from '../models/progress';
import { spacing } from '~/lib/theme/theme';
import { SelectableItem } from '~/components/molecules/components/selectableItem';

interface ModuleChoicesProps {
  choices: any[];
  selected: string | null;
  showFeedback: 'none' | 'success' | 'error';
  completionResult: CompleteModuleResponse | null;
  onSelect: (id: string) => void;
}

const ModuleChoices: React.FC<ModuleChoicesProps> = ({
  choices,
  selected,
  showFeedback,
  onSelect,
}) => (
  <VStack gap={spacing.spacingMedium}>
    {choices.map((choice) => {
      const toggleColor: 'none' | 'success' | 'error' =
        showFeedback !== 'none' && selected === choice.id ? showFeedback : 'none';

      return (
        <SelectableItem
          key={choice.id}
          title={choice.text}
          isSelected={selected === choice.id}
          toggleColor={toggleColor}
          onPress={() => {
            onSelect(choice.id);
          }}
        />
      );
    })}
  </VStack>
);

export default ModuleChoices;
