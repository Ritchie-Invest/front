import React from 'react';
import { Box, VStack, Heading, Text, Spinner } from 'native-base';
import { Icon } from '~/components/atoms/Icon';
import { useTranslation } from 'react-i18next';

interface GameQuestionProps {
  text?: string;
  titleKey: string;
}

const GameQuestion = ({ text, titleKey }: GameQuestionProps) => {
  const { t } = useTranslation();
  return (
    <VStack px={6} mt={6} space={2}>
      <Text fontSize="lg" color="coolGray.500" fontWeight="bold">
        {t(titleKey)}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mt={2}>
        {text}
      </Text>
    </VStack>
  );
};

GameQuestion.Error = ({ error }: { error: any }) => {
  const { t } = useTranslation();
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg="red.50">
      <VStack space={2} alignItems="center">
        <Icon name="error-outline" size="xl" color="red.600" />
        <Heading size="md" color="red.700">
          {t('game.error')}
        </Heading>
        <Text color="red.700">{(error as Error).message}</Text>
      </VStack>
    </Box>
  );
};

GameQuestion.Loading = () => {
  const { t } = useTranslation();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Spinner size="lg" color="blue.500" />
      <Text mt={4}>{t('game.loading')}</Text>
    </Box>
  );
};

export default GameQuestion;
