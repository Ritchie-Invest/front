import React from 'react';
import { Box } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useGameModule } from '../hooks/useGameModule';
import GamesHeader from '../components/GamesHeader';
import GameQuestion from '../components/GameQuestion';
import QCMChoices from '../../qcm/components/QCMChoices';
import TrueFalseChoices from '../../true-false/components/TrueFalseChoices';
import Feedback from '../components/Feedback';
import { isTrueFalseModule } from '../utils/moduleTypeGuards';

const ModuleScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    progress,
    question,
    choices,
    correctAnswer,
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleContinue,
    error,
    loading,
    module,
  } = useGameModule();

  if (loading) return <GameQuestion.Loading />;
  if (error) return <GameQuestion.Error error={error} />;

  const isTrueFalse = isTrueFalseModule(module);

  return (
    <Box flex={1} bg="#fff">
      <GamesHeader progress={progress} onClose={handleContinue} />
      <GameQuestion
        text={question}
        titleKey={isTrueFalse ? 'game.trueOrFalse.moduleSentence' : 'game.qcm.moduleSentence'}
      />

      {isTrueFalse ? (
        <TrueFalseChoices
          selected={selected}
          showFeedback={showFeedback}
          completionResult={completionResult}
          onSelect={handleSelect}
        />
      ) : (
        <QCMChoices
          choices={choices || []}
          selected={selected}
          showFeedback={showFeedback}
          completionResult={completionResult}
          onSelect={handleSelect}
        />
      )}

      {showFeedback !== 'none' && (
        <Feedback
          type={showFeedback as 'success' | 'error'}
          correctText={
            isTrueFalse
              ? t(`game.trueOrFalse.${correctAnswer ? 'true' : 'false'}`)
              : choices?.find((c: any) => c.isCorrect)?.text
          }
          onContinue={handleContinue}
        />
      )}
    </Box>
  );
};

export default ModuleScreen;
