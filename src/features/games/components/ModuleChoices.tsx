import React from 'react';
import { VStack } from 'native-base';
import ChoiceButton from './ChoiceButton';
import { CompleteModuleResponse } from '../models/progress';

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
  completionResult,
  onSelect,
}) => (
  <VStack space={3} mt={8} px={4}>
    {choices.map((choice) => (
      <ChoiceButton
        key={choice.id}
        text={choice.text}
        selected={selected === choice.id}
        correct={!!(completionResult?.isCorrect && selected === choice.id)}
        showFeedback={showFeedback}
        onPress={() => onSelect(choice.id)}
        disabled={showFeedback !== 'none'}
        isCorrectAnswer={choice.isCorrect}
      />
    ))}
  </VStack>
);

export default ModuleChoices;
