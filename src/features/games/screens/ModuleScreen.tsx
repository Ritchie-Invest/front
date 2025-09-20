import React from 'react';
import { Box, Center } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '~/lib/theme/theme';
import { useGameModule } from '../hooks/useGameModule';
import GameQuestion from '../components/GameQuestion';
import GamesChoices from '../components/GamesChoices';
import Feedback from '../components/Feedback';
import { isTrueFalseModule, isQCMModule } from '../utils/moduleTypeGuards';
import { Button } from '~/components/atoms/Button';
import ProgressBar from '~/components/molecules/components/ProgressBar';

const ModuleScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    progress,
    question,
    correctAnswer,
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleContinue,
    handleAnswer,
    error,
    loading,
    module,
  } = useGameModule();

  if (loading) return <GameQuestion.Loading />;
  if (error) return <GameQuestion.Error error={error} />;

  const isTrueFalse = isTrueFalseModule(module);

  return (
    <Box flex={1} bg={colors.mainBackgroundColor} justifyContent="space-between">
      <Box gap={spacing.spacingExtraLarge}>
        <Box gap={spacing.spacingMedium}>
          <ProgressBar value={Math.round(progress * 100)} />
          <GameQuestion
            text={question}
            titleKey={isTrueFalse ? 'game.trueOrFalse.moduleSentence' : 'game.qcm.moduleSentence'}
          />
        </Box>

        <GamesChoices
          module={module}
          selected={selected}
          showFeedback={showFeedback}
          completionResult={completionResult}
          onSelect={handleSelect}
        />
      </Box>
      {showFeedback !== 'none' ? (
        <Feedback
          type={showFeedback as 'success' | 'error'}
          correctText={
            isTrueFalse
              ? t(`game.trueOrFalse.${correctAnswer ? 'true' : 'false'}`)
              : isQCMModule(module)
                ? module.details.choices?.find((c: any) => c.isCorrect)?.text
                : ''
          }
          onContinue={handleContinue}
        />
      ) : (
        <Center width="100%">
          <Button variant={selected ? 'primary' : 'disabled'} onPress={handleAnswer}>
            {t('game.button')}
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default ModuleScreen;
