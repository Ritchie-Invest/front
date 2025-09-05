import React from 'react';
import { VStack } from 'native-base';
import ChoiceButton from './ChoiceButton';
import { CompleteModuleResponse } from '../models/progress';

interface ModuleChoicesProps {
  choices: any[];
  selected: string | null;
  showFeedback: 'none' | 'success' | 'error';
  isReviewMode: boolean;
  completionResult: CompleteModuleResponse | null;
  onSelect: (id: string) => void;
}

const ModuleChoices: React.FC<ModuleChoicesProps> = ({
  choices,
  selected,
  showFeedback,
  isReviewMode,
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
        disabled={showFeedback !== 'none' || isReviewMode}
        isCorrectAnswer={choice.isCorrect}
        isReviewMode={isReviewMode}
      />
    ))}
  </VStack>
);

export default ModuleChoices;
