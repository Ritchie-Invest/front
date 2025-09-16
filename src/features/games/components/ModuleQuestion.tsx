import React from 'react';
import { Box, VStack, Heading, Text, Spinner, Icon } from '@gluestack-ui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { spacing, colors, typography } from '~/lib/theme/theme';

const ModuleQuestion = ({ question }: { question?: string }) => {
  const { t } = useTranslation();
  return (
    <VStack
      px={spacing.spacingMedium}
      mt={spacing.spacingMedium}
      space={spacing.spacingSmallFallback}
    >
      <Text
        fontSize={typography.bodyLargeSize}
        color={colors.secondaryTextColor}
        fontWeight={typography.fontWeightBold}
      >
        {t('game.completeSentence')}
      </Text>
      <Text
        fontSize={typography.heading1Size}
        fontWeight={typography.fontWeightBold}
        mt={spacing.spacingMinimum}
      >
        {question}
      </Text>
    </VStack>
  );
};

ModuleQuestion.Error = ({ error }: { error: any }) => {
  const { t } = useTranslation();
  return (
    <Box flex={1} justifyContent="center" alignItems="center" bg={colors.errorBackgroundColor}>
      <VStack space="sm" alignItems="center">
        <Icon
          as={() => <Ionicons name="close-circle-outline" size={24} color={colors.errorColor} />}
        />
        <Heading size="md" color={colors.errorColor}>
          {t('game.error')}
        </Heading>
        <Text color={colors.errorColor}>{(error as Error).message}</Text>
      </VStack>
    </Box>
  );
};

ModuleQuestion.Loading = () => {
  const { t } = useTranslation();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Spinner size="large" color={colors.primaryActionColor} />
      <Text mt={spacing.spacingMedium}>{t('game.loading')}</Text>
    </Box>
  );
};

export default ModuleQuestion;
