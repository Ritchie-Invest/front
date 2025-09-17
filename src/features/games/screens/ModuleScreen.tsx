import React from 'react';
import { Box, Center } from '@gluestack-ui/themed';
import { colors, spacing } from '~/lib/theme/theme';
import { useModuleScreen } from '../hooks/useModuleScreen';
import ModuleQuestion from '../components/ModuleQuestion';
import ModuleChoices from '../components/ModuleChoices';
import Feedback from '../components/Feedback';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/atoms/Button';
import ProgressBar from '~/components/molecules/components/ProgressBar';

const ModuleScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    progress,
    question,
    choices,
    selected,
    showFeedback,
    completionResult,
    handleSelect,
    handleContinue,
    handleAnswer,
    error,
    loading,
  } = useModuleScreen();

  if (error) return <ModuleQuestion.Error error={error} />;
  if (loading) return <ModuleQuestion.Loading />;

  return (
    <Box flex={1} bg={colors.mainBackgroundColor} justifyContent="space-between">
      <Box gap={spacing.spacingExtraLarge}>
        <Box gap={spacing.spacingMedium}>
          <ProgressBar value={Math.round(progress * 100)} />
          <ModuleQuestion question={question} />
        </Box>

        <ModuleChoices
          choices={choices}
          selected={selected}
          showFeedback={showFeedback}
          completionResult={completionResult}
          onSelect={handleSelect}
        />
      </Box>
      <Box>
        {showFeedback !== 'none' ? (
          <Feedback
            type={showFeedback as 'success' | 'error'}
            correctText={choices.find((c) => c.isCorrect)?.text}
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
    </Box>
  );
};

export default ModuleScreen;
