import React from 'react';
import { Box, Center, ScrollView, HStack } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import { colors, spacing } from '~/lib/theme/theme';
import { useGameModule } from '../hooks/useGameModule';
import GameQuestion from '../components/GameQuestion';
import GamesChoices from '../components/GamesChoices';
import Feedback from '../components/Feedback';
import { getCorrectAnswerText, getTitleKey } from '../utils/moduleTypeGuards';
import { Button } from '~/components/atoms/Button';
import ProgressBar from '~/components/molecules/components/ProgressBar';
import { LifeCounter } from '~/components/molecules/components/LifeCounter';
import { NoLivesModal } from '~/features/life/components/NoLivesModal';

const PERCENTAGE_MULTIPLIER = 100;

const ModuleScreen: React.FC = () => {
  const { t } = useTranslation();
  const {
    progress,
    question,
    selected,
    showFeedback,
    handleSelect,
    handleConfirm,
    handleContinue,
    error,
    loading,
    module,
    showNoLivesModal,
    handleCloseNoLivesModal,
    correctChoiceId,
    wasAnswerCorrect,
  } = useGameModule();

  if (loading) return <GameQuestion.Loading />;
  if (error) return <GameQuestion.Error error={error} />;

  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView
        flex={1}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      >
        <Box gap={spacing.spacingExtraLarge}>
          <Box gap={spacing.spacingMedium}>
            <HStack alignItems="center" justifyContent="space-between" gap={spacing.spacingMedium}>
              <Box flex={1}>
                <ProgressBar value={Math.round(progress * PERCENTAGE_MULTIPLIER)} />
              </Box>
              <LifeCounter showTimer={false} />
            </HStack>
            <GameQuestion text={question} titleKey={getTitleKey(module)} />
          </Box>

          <GamesChoices
            module={module}
            selected={selected}
            showFeedback={showFeedback}
            onSelect={handleSelect}
          />
        </Box>
        {showFeedback !== 'none' ? (
          <Feedback
            type={showFeedback as 'success' | 'error'}
            correctText={getCorrectAnswerText(module, correctChoiceId, wasAnswerCorrect, t)}
            onContinue={handleContinue}
          />
        ) : (
          <Center width="100%">
            <Button variant={selected !== null ? 'primary' : 'disabled'} onPress={handleConfirm}>
              {t('game.button')}
            </Button>
          </Center>
        )}
      </ScrollView>

      <NoLivesModal
        isOpen={showNoLivesModal}
        onClose={handleCloseNoLivesModal}
        shouldNavigateBack={true}
      />
    </Box>
  );
};

export default ModuleScreen;
