import React from 'react';
import { VStack } from '@gluestack-ui/themed';
import { CompleteModuleResponse } from '../models/progress';
import { spacing } from '~/lib/theme/theme';
import { SelectableItem } from '~/components/molecules/components/selectableItem';
import { useTranslation } from 'react-i18next';
import { QCMModule } from '../models/qcmModule';
import { TrueFalseModule } from '../models/trueFalseModule';
import { isQCMModule } from '../utils/moduleTypeGuards';

interface GamesChoicesProps {
  module: QCMModule | TrueFalseModule;
  selected: any;
  showFeedback: 'none' | 'success' | 'error';
  completionResult?: CompleteModuleResponse | null;
  onSelect: (id: any) => void;
}

const GamesChoices: React.FC<GamesChoicesProps> = ({
  module,
  selected,
  showFeedback,
  onSelect,
}) => {
  const { t } = useTranslation();

  const finalChoices = isQCMModule(module)
    ? module.details.choices
    : [
        { id: true, text: t('game.trueOrFalse.true') },
        { id: false, text: t('game.trueOrFalse.false') },
      ];

  return (
    <VStack gap={spacing.spacingMedium}>
      {finalChoices.map((choice) => {
        const toggleColor: 'none' | 'success' | 'error' =
          showFeedback !== 'none' && selected === choice.id ? showFeedback : 'none';

        return (
          <SelectableItem
            key={choice.id.toString()}
            title={choice.text}
            isSelected={selected === choice.id}
            toggleColor={toggleColor}
            disabled={selected !== null && selected !== choice.id}
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
