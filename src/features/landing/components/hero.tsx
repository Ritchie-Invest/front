import React from 'react';
import { VStack, HStack, Text, Progress, ProgressFilledTrack } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Card } from '~/components/molecules/components/card';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';

interface HeroProps {
  progressValue: number;
  completedLessons: number;
  totalLessons: number;
}

export const Hero: React.FC<HeroProps> = ({ progressValue, completedLessons, totalLessons }) => {
  const { t } = useTranslation();

  return (
    <VStack space={spacing.spacingSmallFallback} mb={margins.marginMedium}>
      <VStack space={spacing.spacingSmallFallback}>
        <HStack alignItems="center" space={spacing.spacingSmallFallback}>
          <FontAwesome5 name="bullseye" size={typography.bodySize} color={colors.errorColor} />
          <Text
            fontSize={typography.heading1Size}
            color={colors.primaryActionActiveColor}
            fontWeight={typography.fontWeightBold}
          >
            {t('home.hero.title')}
          </Text>
        </HStack>
        <Text fontSize={typography.bodySmallSize} color={colors.primaryTextColor}>
          {t('home.hero.description')}
        </Text>
      </VStack>

      <Card>
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontWeight={typography.fontWeightBold}>{t('home.hero.progressTitle')}</Text>
          <HStack alignItems="center" space={spacing.spacingOneFallback}>
            <FontAwesome5 name="trophy" color={colors.warningColor} size={typography.bodySize} />
            <Text>
              {completedLessons} / {totalLessons} {t('home.hero.levelsCompleted')}
            </Text>
          </HStack>
        </HStack>
        <Progress value={progressValue} mt={margins.marginSmall} size="md" orientation="horizontal">
          <ProgressFilledTrack backgroundColor={colors.primaryActionColor} />
        </Progress>
      </Card>
    </VStack>
  );
};
