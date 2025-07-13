import React from 'react';
import { View } from 'react-native';
import { VStack, HStack, Text, Progress } from 'native-base';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Card } from '~/components/molecules/card';
import { Chapter } from '../models/responses/chapter';
import { ProgressStatus } from '../types/ProgressStatus';
import { computeProgressStatus } from '../utils/computeProgressStatus';

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
    <View ref={ref}>
      <Card
        variant={statusProps.cardVariant}
        mb={4}
        opacity={statusProps.opacity}
        borderWidth={status === ProgressStatus.LOCKED ? 1 : 0}
        borderColor={status === ProgressStatus.LOCKED ? 'gray.300' : 'transparent'}
        bg={
          status === ProgressStatus.LOCKED
            ? 'gray.50'
            : status === ProgressStatus.COMPLETED
              ? 'emerald.500'
              : status === ProgressStatus.CURRENT
                ? 'blue.600'
                : undefined
        }
      >
        <VStack space={2}>
          <HStack space={2} alignItems="center">
            <Ionicons name={statusProps.iconName} color={statusProps.iconColor} size={16} />
            <Text fontSize="lg" bold color={statusProps.textColor}>
              {title}
            </Text>
            {status === ProgressStatus.CURRENT && (
              <Text
                fontSize="xs"
                bg="white:alpha.30"
                px={2}
                py={1}
                rounded="md"
                color="white"
                fontWeight="bold"
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
            fontSize="xs"
            opacity={status === ProgressStatus.LOCKED ? 0.7 : 1}
          >
            {completedLessons}/{totalLessons} {t('home.chapter.completedLevels')}
          </Text>
          <Progress
            value={progressValue}
            colorScheme={statusProps.progressColorScheme}
            bg={statusProps.progressBg}
            opacity={status === ProgressStatus.LOCKED ? 0.5 : 1}
          />
          {status === ProgressStatus.LOCKED && (
            <Text fontSize="xs" color="gray.500" fontStyle="italic">
              {t('home.chapter.unlockMessage')}
            </Text>
          )}
        </VStack>
      </Card>
    </View>
  );
});
