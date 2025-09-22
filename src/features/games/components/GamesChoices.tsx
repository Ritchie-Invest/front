import React from 'react';
import { VStack } from '@gluestack-ui/themed';
import { spacing } from '~/lib/theme/theme';
import { SelectableItem } from '~/components/molecules/components/selectableItem';
import { useTranslation } from 'react-i18next';
import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { FillBlankModule } from '../models/fillBlankModule';
import { getModuleChoices } from '../utils/moduleTypeGuards';

interface GamesChoicesProps {
  module: QCMModule | TrueFalseModule | FillBlankModule | null;
  selected: string | boolean | null;
  showFeedback: 'none' | 'success' | 'error';
  onSelect: (id: string | boolean) => void;
}

const GamesChoices: React.FC<GamesChoicesProps> = ({
  module,
  selected,
  showFeedback,
  onSelect,
}) => {
  const { t } = useTranslation();

  if (!module) return null;

  const choices = getModuleChoices(module, t);

  return (
    <VStack gap={spacing.spacingMedium}>
      {choices.map((choice) => {
        const toggleColor: 'none' | 'success' | 'error' =
          showFeedback !== 'none' && selected === choice.id ? showFeedback : 'none';

        return (
          <SelectableItem
            key={choice.id.toString()}
            title={choice.text}
            isSelected={selected === choice.id}
            toggleColor={toggleColor}
            disabled={showFeedback !== 'none' && selected !== choice.id}
            onPress={() => {
              onSelect(choice.id);
            }}
          />
        );
      })}
    </VStack>
  );
};

export default GamesChoices;
