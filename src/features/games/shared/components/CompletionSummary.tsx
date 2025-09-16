import React from 'react';
import { Box, VStack, Text, Icon } from '@gluestack-ui/themed';
import Ionicons from '@expo/vector-icons/Ionicons';
import StatCard from './StatCard';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, borderRadius } from '~/lib/theme/theme';

interface CompletionSummaryProps {
  xp: number;
  completedModules: number;
  totalModules: number;
  isSuccess?: boolean;
}

const CompletionSummary: React.FC<CompletionSummaryProps> = ({
  xp,
  completedModules,
  totalModules,
  isSuccess,
}) => {
  const { t } = useTranslation();

  return (
    <VStack space={spacing.spacingExtraLargeFallback} alignItems="center" w="100%">
      <Box
        bg={colors.successColor}
        borderRadius={borderRadius.borderRadiusCircle}
        p={spacing.spacingMedium}
        mb={spacing.spacingMinimum}
      >
        <Icon
          as={() => <Ionicons name="checkmark" size={40} color={colors.mainBackgroundColor} />}
        />
      </Box>
      <Text
        fontSize={typography.heading1Size}
        fontWeight={typography.fontWeightBold}
        color={colors.primaryTextColor}
        textAlign="center"
      >
        {isSuccess ? t('completion.congrats') : t('completion.failed')}
      </Text>
      <Text fontSize={typography.bodySize} color={colors.secondaryTextColor} textAlign="center">
        {isSuccess ? t('completion.lessonSuccess') : t('completion.lessonFailed')}
      </Text>
      <VStack space={spacing.spacingLargeFallback} w="100%">
        <StatCard icon="bolt" color={colors.accentTextColor} label="XP" value={xp} />
        <StatCard
          icon="center-focus-strong"
          color={colors.successColor}
          label="Score"
          value={`${completedModules}/${totalModules}`}
        />
      </VStack>
    </VStack>
  );
};

export default CompletionSummary;
