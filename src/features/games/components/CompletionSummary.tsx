import React from 'react';
import { Box, VStack, Text } from 'native-base';
import { Icon } from '~/components/atoms/Icon';
import StatCard from './StatCard';
import { useTranslation } from 'react-i18next';

interface CompletionSummaryProps {
  xp: number;
  score: number;
  chrono: string;
}

const CompletionSummary: React.FC<CompletionSummaryProps> = ({ xp, score, chrono }) => {
  const { t } = useTranslation();
  const isSuccess = score === 100;
  return (
    <VStack space={6} alignItems="center" w="100%">
      <Box bg="green.400" borderRadius={50} p={4} mb={2}>
        <Icon name="check" size="2xl" color="white" />
      </Box>
      <Text fontSize="2xl" fontWeight="bold" color="black" textAlign="center">
        {isSuccess ? t('completion.congrats') : t('completion.failed')}
      </Text>
      <Text fontSize="md" color="coolGray.700" textAlign="center">
        {isSuccess ? t('completion.lessonSuccess') : t('completion.lessonFailed')}
      </Text>
      <VStack space={3} w="100%">
        <StatCard icon="bolt" color="yellow.500" label="XP" value={xp} />
        <StatCard icon="center-focus-strong" color="green.500" label="Score" value={`${score}%`} />
        <StatCard icon="timer" color="blue.500" label="Chrono" value={chrono} />
      </VStack>
    </VStack>
  );
};

export default CompletionSummary;
