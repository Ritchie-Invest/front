import React from 'react';
import { Box } from '@gluestack-ui/themed';
import { colors } from '~/lib/theme/theme';
import { useModuleScreen } from '../hooks/useModuleScreen';
import GamesHeader from '../components/GamesHeader';
import ModuleQuestion from '../components/ModuleQuestion';
import ModuleChoices from '../components/ModuleChoices';
import Feedback from '../components/Feedback';

const ModuleScreen: React.FC = () => {
  const {
    progress,
    question,
    choices,
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleContinue,
    error,
    loading,
  } = useModuleScreen();

  if (error) return <ModuleQuestion.Error error={error} />;
  if (loading) return <ModuleQuestion.Loading />;

  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <GamesHeader progress={progress} onClose={handleContinue} />
      <ModuleQuestion question={question} />
      <ModuleChoices
        choices={choices}
        selected={selected}
        showFeedback={showFeedback}
        completionResult={completionResult}
        onSelect={handleSelect}
      />
      {showFeedback !== 'none' && (
        <Feedback
          type={showFeedback as 'success' | 'error'}
          correctText={choices.find((c) => c.isCorrect)?.text}
          onContinue={handleContinue}
        />
      )}
    </Box>
  );
};

export default ModuleScreen;
