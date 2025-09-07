import React from 'react';
import { View } from 'react-native';
import { VStack, HStack, Text, Progress } from '@gluestack-ui/themed';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '~/components/molecules/components/card';
import { Chapter } from '../models/responses/chapter';
import { ProgressStatus } from '../types/ProgressStatus';
import { computeProgressStatus } from '../utils/computeProgressStatus';
import { borderRadius, colors, paddings, spacing, typography } from '~/lib/theme/theme';

interface ChapterCardProps {
  chapter: Chapter;
}

export const ChapterCard = React.forwardRef<any, ChapterCardProps>((props, ref) => {
  const { chapter, ...rest } = props;
  const { t } = useTranslation();

  const { title, description, completedLessons, totalLessons, isUnlocked } = chapter;
  const progressValue = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const status = computeProgressStatus(isUnlocked, completedLessons, totalLessons);

  const getStatusProps = () => {
    switch (status) {
      case ProgressStatus.COMPLETED:
        return {
          cardVariant: 'chapter' as const,
          iconName: 'checkmark-circle' as const,
          iconColor: 'white',
          textColor: 'white',
          progressColorScheme: 'white',
          progressBg: 'white:alpha.30',
          opacity: 1,
        };
      case ProgressStatus.CURRENT:
        return {
          cardVariant: 'chapter' as const,
          iconName: 'book' as const,
          iconColor: 'white',
          textColor: 'white',
          progressColorScheme: 'white',
          progressBg: 'white:alpha.30',
          opacity: 1,
        };
      case ProgressStatus.LOCKED:
        return {
          cardVariant: 'default' as const,
          iconName: 'lock-closed' as const,
          iconColor: 'gray.400',
          textColor: 'gray.400',
          progressColorScheme: 'gray',
          progressBg: 'gray.200',
          opacity: 0.6,
        };
      default:
        return {
          cardVariant: 'chapter' as const,
          iconName: 'book' as const,
          iconColor: 'white',
          textColor: 'white',
          progressColorScheme: 'white',
          progressBg: 'white:alpha.30',
          opacity: 1,
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <View ref={ref} style={{ marginBottom: 16 }}>
      <Card
        variant={statusProps.cardVariant}
        style={{
          opacity: statusProps.opacity,
          borderWidth: status === ProgressStatus.LOCKED ? 1 : 0,
          borderColor: status === ProgressStatus.LOCKED ? '#d1d5db' : 'transparent',
          backgroundColor:
            status === ProgressStatus.LOCKED
              ? colors.componentBackgroundColor
              : status === ProgressStatus.COMPLETED
                ? colors.successBackgroundColor
                : status === ProgressStatus.CURRENT
                  ? colors.primaryActionColor
                  : undefined,
        }}
      >
        <VStack space={spacing.spaceMinimumFallback}>
          <HStack space={spacing.spaceMinimumFallback} alignItems="center">
            <Ionicons
              name={statusProps.iconName}
              color={statusProps.iconColor}
              size={typography.bodySize}
            />
            <Text
              fontSize={typography.bodyLargeSize}
              fontWeight={typography.fontWeightBold}
              color={statusProps.textColor}
            >
              {title}
            </Text>
            {status === ProgressStatus.CURRENT && (
              <Text
                fontSize={typography.captionSize}
                bg={colors.componentBackgroundColor}
                px={paddings.paddingExtraSmall}
                py={paddings.paddingMinimum}
                borderRadius={borderRadius.borderRadiusMedium}
                color={colors.secondaryTextColor}
                fontWeight={typography.fontWeightBold}
              >
                {t('home.chapter.current')}
              </Text>
            )}
          </HStack>
          <Text color={statusProps.textColor} opacity={status === ProgressStatus.LOCKED ? 0.7 : 1}>
            {description}
          </Text>
          <Text
            color={statusProps.textColor}
            fontSize={12}
            opacity={status === ProgressStatus.LOCKED ? 0.7 : 1}
          >
            {completedLessons}/{totalLessons} {t('home.chapter.completedLevels')}
          </Text>
          <Progress
            value={progressValue}
            size="md"
            bg={statusProps.progressBg}
            opacity={status === ProgressStatus.LOCKED ? 0.5 : 1}
          />
          {status === ProgressStatus.LOCKED && (
            <Text fontSize={12} color="$text500" fontStyle="italic">
              {t('home.chapter.unlockMessage')}
            </Text>
          )}
        </VStack>
      </Card>
    </View>
  );
});
