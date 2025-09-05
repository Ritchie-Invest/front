import React from 'react';
import { Box } from 'native-base';
import { useModuleScreen } from '../hooks/useModuleScreen';
import QuizHeader from '../components/QuizHeader';
import ModuleQuestion from '../components/ModuleQuestion';
import ModuleChoices from '../components/ModuleChoices';
import QuizFeedback from '../components/QuizFeedback';
import ReviewModeFeedback from '../components/ReviewModeFeedback';

const ModuleScreen: React.FC = () => {
  const {
    progress,
    question,
    choices,
    selected,
    showFeedback,
    isReviewMode,
    completionResult,
    handleSelect,
    handleContinue,
    handleReviewContinue,
    error,
    loading,
  } = useModuleScreen();

  if (error) return <ModuleQuestion.Error error={error} />;
  if (loading) return <ModuleQuestion.Loading />;

  return (
    <Box flex={1} bg="#fff">
      <QuizHeader progress={progress} onClose={handleContinue} />
      <ModuleQuestion question={question} />
      <ModuleChoices
        choices={choices}
        selected={selected}
        showFeedback={showFeedback}
        isReviewMode={isReviewMode}
        completionResult={completionResult}
        onSelect={handleSelect}
      />
      {showFeedback !== 'none' && !isReviewMode && (
        <QuizFeedback
          type={showFeedback as 'success' | 'error'}
          correctText={choices.find((c) => c.isCorrect)?.text}
          onContinue={handleContinue}
        />
      )}
      {isReviewMode && <ReviewModeFeedback onContinue={handleReviewContinue} />}
    </Box>
  );
};

export default ModuleScreen;
